import React, {useEffect, useState} from 'react';
import { Form, DatePicker, Select, Input, Upload, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import decisionsApi, {
  DecisionOnCreateData,
  decisionStatusType,
  DecisionWrapper,
  decisionTarget,
  FileWrapper,
  Organization,
  statusTypePostParser } from '../../api/decisionsApi'
import { getBase64 } from '../userPage/EditUserPage/Services';
import notificationLogic from '../../components/Notifications/Notification';
type FormAddDecisionProps ={
   setVisibleModal: (visibleModal: boolean) => void;
   onAdd: () => void;
}
const FormAddDecision : React.FC<FormAddDecisionProps> = (props: any) => {
 const classes = require('./Table.module.css');
 const  { setVisibleModal, onAdd } = props;
 const [fileData, setFileData] = useState<FileWrapper>({FileAsBase64 : null, FileName: null});
 const [form] = Form.useForm();
  const normFile = (e: { fileList: any }) => {
    if (Array.isArray(e)) {
      console.log(e);
      return e;
    }

    return e && e.fileList;
  };
  const handleCancel = () => {
    setVisibleModal(false);
  };
  const handleUpload = (info :any) => {
    console.log(info.file);
    if(info.file !== null){
      if(info.file.size <= 3145728){
        getBase64( info.file,(base64: string) => {
          setFileData({FileAsBase64 :base64.split(',')[1] ,  FileName:info.file.name});
        });
        notificationLogic('success', "Файл завантажено");
      }
      else{
        notificationLogic('error', "Розмір файлу перевищує 3 Мб");
      }
   
    }
    else{
      notificationLogic('error', "Проблема з завантаженням файлу");
    }

  }
  
 const handleSubmit = async (values : any)=>{
   console.log(fileData);
  const newDecision  : DecisionWrapper= {
    decision: {
      id: 0,
      name: values.name,
      decisionStatusType: statusTypePostParser(JSON.parse(values.decisionStatusType)),
      organization:JSON.parse(values.organization),
      decisionTarget:JSON.parse(values.decisionTarget),
      description: values.description,
      date:/* eslint no-underscore-dangle: ["error", { "allow": ["_d"] }] */ values.datepicker._d,
      fileName: fileData.FileName,
    },
    fileAsBase64: fileData.FileAsBase64,
  }
  await decisionsApi.post(newDecision);
  setVisibleModal(false);
  const dst : decisionStatusType = JSON.parse(values.decisionStatusType);
  const dt : decisionTarget = JSON.parse(values.decisionTarget);
 
  onAdd();
  form.resetFields();
  }
  const[data, setData] = useState<DecisionOnCreateData>({organizations: Array<Organization>(),
    decisionStatusTypeListItems: Array<decisionStatusType>(),
    decisionTargets: Array<decisionTarget>(),});
  useEffect(() => {
    const fetchData = async () => {
      await decisionsApi.getOnCreate()
      .then((d: DecisionOnCreateData) =>
        setData(d));
    };
    fetchData();
  },[]);
  return (
    <Form
      name="basic"
      onFinish ={handleSubmit}
      form = {form}
    >
      <Form.Item
        label="Назва рішення"
        name="name"
        rules={[
          {
         
            required: true,
            message: 'Це поле має бути заповненим' 
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
       label="Рішення органу"
       name = "organization"
       rules={[ { required: true,  message: 'Це поле має бути заповненим'}]}>
        <Select>
      {data?.organizations.map(o => ( <Select.Option key={o.id} value={JSON.stringify(o)}>{o.organizationName}</Select.Option>))}
        </Select>
      </Form.Item>
      <Form.Item
       label="Тема рішення"
       name ="decisionTarget"
       rules={[ { required: true,  message: 'Це поле має бути заповненим'}]}>
        <Select>
        {data?.decisionTargets.map(dt => ( <Select.Option key ={dt.id }value={JSON.stringify(dt)}>{dt.targetName}</Select.Option>))}
        </Select>
      </Form.Item>
      <Form.Item 
       name="datepicker"
       label="Дата рішення"
       rules={[ { required: true,  message: 'Це поле має бути заповненим'}]}>
        <DatePicker format = "YYYY-MM-DD"/>
      </Form.Item>
      <Form.Item 
       label="Текст рішення"
       name = "description"
       rules={[ { required: true,  message: 'Це поле має бути заповненим'}]}>
        <Input.TextArea allowClear />
      </Form.Item>
      <Form.Item label="Прикріпити">
        <Form.Item
          name="dragger"
         valuePropName="fileList"
          getValueFromEvent={normFile}
          noStyle
        >
          <Upload.Dragger name = "file" 
            customRequest = {handleUpload}
            multiple ={false}
            showUploadList ={false}
            accept =".doc,.docx,.png,.xls,xlsx,.png,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            headers = { { authorization: 'authorization-text'}}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined style={{ color: '#3c5438' }} />
           </p>
            <p className="ant-upload-hint">
              Клікніть або перетягніть файл для завантаження
            </p>
          </Upload.Dragger>
        </Form.Item>  
      {fileData.FileAsBase64 !== null &&<div><div>{fileData.FileName}</div> <Button className = {classes.cardButton} onClick= {()=>{
        setFileData({FileAsBase64 : null, FileName: null});
        notificationLogic('success', "Файл видалено");
      }}> Видалити файл</Button></div>}
      </Form.Item>
      <Form.Item
       label="Статус рішення"
       name ="decisionStatusType"
       rules={[ { required: true,  message: 'Це поле має бути заповненим'}]}>
        <Select>
        {data?.decisionStatusTypeListItems.map(dst=> ( <Select.Option key= {dst.value} value={JSON.stringify(dst)}>{dst.text}</Select.Option>))}
        </Select>
      </Form.Item>

      <Form.Item style = {{ textAlign: "right"}}>
      <Button 
        key="back"
        onClick = {handleCancel}
        >
          Відмінити
        </Button>
        <Button
         type="primary" htmlType="submit"
        >
         Опублікувати
        </Button>

      </Form.Item> 
    </Form>
  );
};

export default FormAddDecision;
