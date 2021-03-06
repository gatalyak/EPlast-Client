import React, { useEffect, useState } from "react";
import { Button, Form, Input, Layout, Upload, message, Row, Col, Spin, notification } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons/lib";
import City from "../../../assets/images/default_city_image.jpg";
import clubsApi from "../../../api/clubsApi";
import { RcFile } from "antd/lib/upload/interface";
import { useParams, useHistory } from "react-router-dom";
import classes from "./CreateClub.module.css";

const dummyRequest = ({ onSuccess }: any) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

const getBase64 = (img: Blob, callback: Function) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    notification.error({
      message: "Можна завантажити зображення лише у JPG/JPEG/PNG форматі"
    });
  }
  const isLt2M = file.size / 1024 / 1024 < 5;
  if (!isLt2M) {
    notification.error({
      message: "Розмір зображення має бути менший 5MB"
    });
  }
  return isJpgOrPng && isLt2M;
};

const CreateClub = () => {
  const { id } = useParams();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [servLoading, setServLoading] = useState(false);
  const [clubLogo, setClubLogo] = useState("");
  const [form] = Form.useForm();
  useEffect(() => {
    if (id) {
      getClub();
    } else {
      setServLoading(false);
    }
  }, []);
  const getClub = async () => {
    setServLoading(true);
    try {
      const res = await (await clubsApi.getById(id)).data.club;

      form.setFieldsValue({
        id: res.id,
        clubName: res.clubName,
        clubURL: res.clubURL,
        description: res.description,
      });
      setClubLogo(res.logo);
    } finally {
      setServLoading(false);
    }
  };

  const handleChange = (info: any, key: string) => {
    console.log(info.file.status, "status");

    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        setLoading(false);
        setClubLogo(imageUrl);
      });
    }
  };
  const handleSubmit = async (values: any) => {
    notification.info({
      message: id ? "Збереження..." : "Створення...",
      icon: <LoadingOutlined />,
    });

    const newСlub = {
      id: id,
      clubName: values.clubName,
      clubURL: values.clubURL,
      description: values.description,
      logo: clubLogo,
    };
    
    await clubsApi
      .post("Club/" + (id ? "edit" : "create"), newСlub)
      .then((res) => {
        newСlub.id = res.data.id;
        notification.success({
          message: id ? "Курінь успішно відредаговано" : "Курінь успішно створено",
        });
        id ? history.goBack() : history.push( `${newСlub.id}`);
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          notification.error({
            message: id ? 
            "Не вдалося відредагувати курінь (Курінь з таким ім'ям вже існує)" 
            : "Не вдалося створити курінь (Курінь з таким ім'ям вже існує)",
          });
        }
        else {
          notification.error({
            message: id ? "Не вдалося відредагувати курінь" : "Не вдалося створити курінь",
          });
        }
      });
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <img src={City} alt="Club" style={{ width: "300px" }} />
    </div>
  );

  const validateMessages = {
    required: "Це поле є обов`язковим!",
  };

  return ( servLoading ? 
    (<Layout.Content className={classes.spiner}>
      <Spin size="large" />
    </Layout.Content>) :
    (<Layout.Content className={classes.createClub}>
      <h1 className={classes.mainTitle}>
        {id ? "Редагування" : "Створення"} куреня
      </h1>
      <Row justify="space-around" style={{ overflow: "hidden" }}>
        <Col flex="0 1 40%">
          <Form
            className={classes.clubForm}
            layout="vertical"
            onFinish={handleSubmit}
            form={form}
          >
            <Form.Item
              name="clubName"
              label="Назва"
              rules={[
                { required: true, 
                  message: 'Вкажіть назву куреня' }, 
                { max: 50, 
                  message: 'Назва куреня не може перевищувати 50 символів' }
                ]}>
              <Input />
            </Form.Item>
            <Form.Item 
              name="clubURL" 
              label="Посилання" >
              <Input 
              type="url"
              placeholder="https://www.example.com" />
            </Form.Item>
            <Form.Item 
              name="description" 
              label="Опис"
              rules={[
                { max: 1000, 
                  message: 'Опис куреня не може перевищувати 1000 символів' }]} >
              <Input.TextArea rows={5} />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                className={classes.createButton} >
                Зберегти
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col flex="0 1 40%">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            customRequest={dummyRequest}
            beforeUpload={beforeUpload}
            onChange={(event) => handleChange(event, "logo")}
          >
            {clubLogo ? (
              <img src={clubLogo} alt="Club" style={{ width: "300px" }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Col>
      </Row>
    </Layout.Content> )
  );
};

export default CreateClub;
