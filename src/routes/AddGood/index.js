import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Button } from 'antd-mobile';
// import { createForm } from 'rc-form';
import { FormItem } from './../../components';
import { reduxForm, Field } from 'redux-form';
import validate from '../../utils/validate';
import { connect } from 'dva';
import { Toast } from 'antd-mobile';
import ajax from '../../utils/ajax';
import AddPhotos from './AddPhotos'


import './addGood.less';

const baseInfoFormValidate = validate({
    validateType: {
        proTypeId: '*',
        proName: '*',
        proPrice: '*',
        // proPeriodNum: '*',
        subsidyType: '*',
    },
    nullTip: {
        proTypeId: '请选择商品类型',
        proName: '请填写商品名称',
        proPrice: '请输入售价',
        // proPeriodNum: '请选择分期期数',
        subsidyType: '请选择贴息方式',
    }
});

@connect(({ organInfo }) => ({ organInfo }))
@reduxForm({
    form: 'goodsForm',
    persistentSubmitErrors: true,
    initialValues: {
    },
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,  // 这个值表示重新初始化表单后，是否替换已更改的值，
    validate: baseInfoFormValidate,
    // warn: (values) => {
    //     let warn = {};
    //     let error = baseInfoFormValidate(values);
    //     return warn;
    // }
})

@withRouter
export default class AddGood extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            typeArr: [],
            goodsInfo: {},
            periodArray: [],
            discountType: '', //贴息方式，默认不贴息，不显示输入金额或者百分比的输入框
        }
    }

    componentWillMount() {
        this.props.reset();
        const { match: { params: { proId = '' } }, organInfo: { organType } } = this.props;
        if (proId) {
            ajax.post('/mobile/selectProDetail', { proId }).then((data) => {
                const proDetail = data.proDetail;
                let typeArr = [], periodArray = [];

                let initialData = {
                    proTypeId: proDetail.proTypeId,
                    proName: proDetail.proName,
                    proPrice: proDetail.proSalePrice,
                    // proPeriodNum: proDetail.proPeriodNum,
                    subsidyType: proDetail.subsidyType,
                    // proDescImg: imgArr
                }
                if (proDetail.proDescImg) {
                    const imgArr = [proDetail.proDescImg];
                    initialData.proDescImg = imgArr;
                }
                switch (proDetail.subsidyType) {
                    case '1':
                        initialData.subsidyProprotion = proDetail.subsidyProprotion
                        break;
                    case '2':
                        initialData.subsidyAmount = proDetail.subsidyAmount
                        break;
                    default:
                        break;
                }
                this.show(proDetail.subsidyType);

                proDetail.typeList.map((ele, index) => {
                    let obj = {};
                    obj.value = ele.proTypeId;
                    obj.label = ele.proTypeName;
                    typeArr.push(obj);
                })
                //0 3c  1 教育
                if (organType == '0') {
                    initialData.proPeriodNum = proDetail.proPeriodNum;
                    proDetail.resultData.periodArray.map((ele, index) => {
                        let periodObj = {};
                        periodObj.value = ele;
                        periodObj.label = ele;
                        periodArray.push(periodObj);
                    })
                } else {
                    initialData.guaceDiscountNum = proDetail.guaceDiscountNum;
                    proDetail.resultData.graceArray.map((ele, index) => {
                        let periodObj = {};
                        periodObj.value = index;
                        periodObj.label = ele;
                        periodArray.push(periodObj);
                    })
                }
                this.props.initialize(initialData);
                this.setState({
                    typeArr,
                    periodArray,
                    goodsInfo: data.proDetail
                })

            }).catch((err) => {
                console.log(err)
            })
        } else {
            ajax.post('/mobile/selectTeam', { proType: 0, orderAmt: 0 }).then((data) => {
                let typeArr = [], periodArray = [];
                data.typeList.map((ele, index) => {
                    let obj = {};
                    obj.value = ele.proTypeId;
                    obj.label = ele.proTypeName;
                    typeArr.push(obj);
                })
                data.resultData.periodArray.map((ele, index) => {
                    let periodObj = {};
                    periodObj.value = ele;
                    periodObj.label = ele;
                    periodArray.push(periodObj);
                })
                this.setState({
                    typeArr,
                    periodArray
                })
            }).catch((err) => {
                console.log(err)
            });
        }
    }
    show = (type) => {
        // console.log(type);
        this.setState({
            discountType: type
        })
    }

    save = (values) => {
        const { history, error, match: { params: { proId = '' } }, organInfo: { organType } } = this.props;
        const { goodsInfo } = this.state;
        // console.log(this.props, values);
        if (error) {
            Toast.info(error);
        } else {

            let sendData = {
                // proName: values.proName,
                // proPeriodNum: values.proPeriodNum,
                // proPrice: values.proPrice,
                // proTypeId: values.proTypeId
            };
            Object.assign(sendData, values)
            //0 3c  1 教育
            if (proId) {
                sendData.proId = proId;
                sendData.type = 1;
                //修改商品商品时，教育商品售价不能大于信贷后台设置的
                if (organType == '1' && values.proPrice * 1 > goodsInfo.proPrice * 1) {
                    Toast.info(`商品价格不能高于商品标注价格${goodsInfo.proPrice}元`);
                    return false;
                }
            } else {
                sendData.type = 0;
            }
            let proDescImg = '';
            if (values.proDescImg) {
                values.proDescImg.map((item, index) =>
                    proDescImg += item + ','
                )
                if (proDescImg.endsWith(',')) {
                    proDescImg = proDescImg.substring(0, proDescImg.length - 1);
                }
                sendData.proDescImg = proDescImg;
            }


            console.log(sendData);
            ajax.post('/mobile/proOperation', sendData).then((data) => {
                // console.log(data);
                Toast.info('保存成功');
                setTimeout(() => {
                    history.go(-1);
                }, 3000);
            }).catch((err) => {
                console.log(err)
            });
        }
    }
    render() {
        const { handleSubmit, organInfo: { organType } } = this.props;
        const { typeArr, periodArray, discountType } = this.state;
        const methodArr = [{ value: '0', label: '不贴息' }, { value: '1', label: '按比例贴息' }, { value: '2', label: '按金额贴息' }];
        return (
            <section className="addGood">
                <ul className="addGood-list">
                    <li className="addGood-list-item">
                        <Field title="商品类型" component={FormItem} extra="请选择商品类型" name="proTypeId" type="select" cols={1} arr={typeArr} />
                    </li>
                    <li className="addGood-list-item">
                        <Field className="smallSize" title="商品名称" component={FormItem} name="proName" placeholder="请填写完整的商品名称，包括颜色、内存、型号" maxLength='50' />
                    </li>
                    <li className="clearfix account-img">
                        <span>商品图片(选填)</span>
                        <Field name='proDescImg' component={AddPhotos} ></Field>
                    </li>
                </ul>

                <ul className="addGood-list">
                    <li className="addGood-list-item">
                        <Field title="售价" component={FormItem} name="proPrice" placeholder="请输入售价" maxLength='6' />
                    </li>
                    <li className="addGood-list-item" style={{ display: organType === '0' ? 'block' : 'none' }}>
                        <Field title="分期期数" tips="设置分期期数后，用户下单只能选择该期数分期" component={FormItem} extra="请选择分期期数" name="proPeriodNum" type="select" cols={1} arr={periodArray} />
                    </li>
                    <li className="addGood-list-item" style={{ display: organType === '1' ? 'block' : 'none' }}>
                        <Field title="宽限期贴息" component={FormItem} extra="请选择宽限期贴息期数" name="guaceDiscountNum" type="select" cols={1} arr={periodArray} />
                    </li>
                    <li className="addGood-list-item">
                        <Field title="贴息方式" component={FormItem} extra="请选择贴息方式" name="subsidyType" type="select" cols={1} arr={methodArr} show={this.show} />
                    </li>
                    <li className="addGood-list-item" style={{ display: discountType == '2' ? 'block' : 'none' }}>
                        <Field title="贴息金额" component={FormItem} name="subsidyAmount" placeholder="请输入贴息金额" />
                    </li>
                    <li className="addGood-list-item" style={{ display: discountType == '1' ? 'block' : 'none' }}>
                        <Field title="贴息百分比" component={FormItem} name="subsidyProprotion" placeholder="请输入贴息百分比" />
                    </li>
                </ul>
                <Button type="primary" onClick={handleSubmit(this.save)}>保存</Button>
            </section>
        )
    }
}
