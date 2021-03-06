import React from 'react';
import { Form, Select, Button,DatePicker } from 'antd';
import activeMembershipApi,{ PlastDegree, UserPlastDegreePost, UserPlastDegree } from '../../../../api/activeMembershipApi';
import classes from "./FormAddPlastDegree.module.css"
type FormAddPlastDegreeProps = {
    availablePlastDegree:  Array<PlastDegree>;
    setVisibleModal: (visibleModal: boolean) => void;
    handleDeleteUserPlastDegree : (plastDegreeId : number) => void;
    handleAddDegree : () => void;
    userId : string;
};

const FormAddPlastDegree = ({setVisibleModal, userId, availablePlastDegree,handleDeleteUserPlastDegree,handleAddDegree}: FormAddPlastDegreeProps)=>{
    const [form] = Form.useForm();
    const handleFinish = async (info: any) =>{
       const userPlastDegreePost :UserPlastDegreePost ={
        plastDegreeId : info.plastDegree,
        dateStart : info.datepickerStart._d,
        dateFinish: null,
        userId : userId
       };
       await activeMembershipApi.postUserPlastDegree(userPlastDegreePost);
       setVisibleModal(false);
       handleAddDegree();
       form.resetFields();
    }
    return <Form
    name="basic"
    onFinish ={handleFinish}
    form = {form}>
        <Form.Item
        name ="plastDegree"
         label="Назва ступеню"
         rules={[ { required: true,  message: 'Це поле має бути заповненим'}]}>
<Select>{availablePlastDegree.map( apd => (<Select.Option key={apd.id} value={apd.id}>{apd.name}</Select.Option>))}</Select>
        </Form.Item>
        <Form.Item 
        className={classes.formField}
       name="datepickerStart"
       label="Дата  надання"
       rules={[ { required: true,  message: 'Це поле має бути заповненим'}]}>
        <DatePicker format = "YYYY-MM-DD"
        className={classes.selectField}
        />
      </Form.Item>
        <Button
         type="primary" htmlType="submit"
        >
         Додати
        </Button>
    </Form>
}
export default FormAddPlastDegree;