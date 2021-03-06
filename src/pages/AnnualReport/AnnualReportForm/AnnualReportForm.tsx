import React from 'react';
import { Typography, Form, Row, Col, Input, Select, message } from 'antd';
import Props from './AnnualReportFormProps';
import './AnnualReportForm.less';

const { Title, Text } = Typography;
const { TextArea } = Input;

const AnnualReportForm = (props: Props) => {
    const { title, cityMembers, cityLegalStatuses } = props;

    const validationSchema = {
        cityLegalStatus: [
            { required: true, message: "Оберіть правовий статус осередку" }
        ],
        number: [
            { required: true, message: "Поле є обов'язковим для заповнення" },
            { pattern: /^\d+$/, message: "Поле повинне містити додатні цілі числа" }
        ],
        textarea: [
            { max: 2000, message: "Максимально допустима кількість символів - 2000" }
        ]
    }

    return (
        <>
            <Title>{title}</Title>
            <Row
                gutter={16}
                align='bottom'>
                <Col
                    xs={24} sm={12} md={12} lg={12}
                    className='container'>
                    <Text strong={true}>Голова новообраної Старшини</Text>
                    <Form.Item
                        name='newCityAdminId'
                        className='w100'>
                        <Select
                            showSearch
                            optionFilterProp="children"
                            options={cityMembers}>
                        </Select>
                    </Form.Item>
                </Col>
                <Col
                    xs={24} sm={12} md={12} lg={12}
                    className='container'>
                    <Text strong={true}>Правовий статус осередку</Text>
                    <Form.Item
                        className='w100'
                        name='newCityLegalStatusType'
                        rules={validationSchema.cityLegalStatus}>
                        <Select
                            options={cityLegalStatuses}></Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row
                gutter={16}
                align='bottom'>
                <Col
                    xs={24} sm={24} md={12} lg={12}
                    className='container'>
                    <Text strong={true}>УПП</Text>
                    <Row
                        gutter={16}
                        align='bottom'>
                        <Col
                            xs={24} sm={12} md={24} lg={12}>
                            <Text>Кількість гніздечок пташат</Text>
                            <Form.Item
                                className='w100'
                                name='numberOfSeatsPtashat'
                                rules={validationSchema.number} >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col
                            xs={24} sm={12} md={24} lg={12}>
                            <Text>Кількість пташат</Text>
                            <Form.Item
                                className='w100'
                                name={['membersStatistic', 'numberOfPtashata']}
                                rules={validationSchema.number}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
                <Col
                    xs={24} sm={24} md={12} lg={12}
                    className='container'>
                    <Text strong={true}>УПН</Text>
                    <Row
                        gutter={16}
                        align='bottom'>
                        <Col
                            xs={24} sm={12} md={24} lg={12}>
                            <Text>Кількість самостійних роїв</Text>
                            <Form.Item
                                className='w100'
                                name='numberOfIndependentRiy'
                                rules={validationSchema.number}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col
                            xs={24} sm={12} md={24} lg={12}>
                            <Text>Кількість новацтва</Text>
                            <Form.Item
                                className='w100'
                                name={['membersStatistic', 'numberOfNovatstva']}
                                rules={validationSchema.number}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <div className='container'>
                <Text strong={true}>УПЮ</Text>
                <Row
                    gutter={16}
                    align='bottom'>
                    <Col
                        xs={24} sm={24} md={12} lg={8}>
                        <Text>Кількість куренів у станиці/паланці (окрузі/регіоні)</Text>
                        <Form.Item
                            className='w100'
                            name='numberOfClubs'
                            rules={validationSchema.number}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col
                        xs={24} sm={24} md={12} lg={8}>
                        <Text>Кількість самостійних гуртків</Text>
                        <Form.Item
                            className='w100'
                            name='numberOfIndependentGroups'
                            rules={validationSchema.number}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col
                        xs={24} sm={24} md={12} lg={8}>
                        <Text>Кількість неіменованих разом</Text>
                        <Form.Item
                            className='w100'
                            name={['membersStatistic', 'numberOfUnatstvaNoname']}
                            rules={validationSchema.number}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col
                        xs={24} sm={24} md={12} lg={6}>
                        <Text>Кількість прихильників/ць</Text>
                        <Form.Item
                            className='w100'
                            name={['membersStatistic', 'numberOfUnatstvaSupporters']}
                            rules={validationSchema.number}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col
                        xs={24} sm={24} md={8} lg={6}>
                        <Text>Кількість учасників/ць</Text>
                        <Form.Item
                            className='w100'
                            name={['membersStatistic', 'numberOfUnatstvaMembers']}
                            rules={validationSchema.number}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col
                        xs={24} sm={24} md={8} lg={6}>
                        <Text>Кількість розвідувачів</Text>
                        <Form.Item
                            className='w100'
                            name={['membersStatistic', 'numberOfUnatstvaProspectors']}
                            rules={validationSchema.number}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col
                        xs={24} sm={24} md={8} lg={6}>
                        <Text>Кількість скобів/вірлиць</Text>
                        <Form.Item
                            className='w100'
                            name={['membersStatistic', 'numberOfUnatstvaSkobVirlyts']}
                            rules={validationSchema.number}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </div>
            <Row
                gutter={16}
                align='bottom'>
                <Col
                    xs={24} sm={24} md={12} lg={12}
                    className='container'>
                    <Text strong={true}>УСП</Text>
                    <Row
                        gutter={16}
                        align='bottom'>
                        <Col
                            xs={24} sm={12} md={24} lg={12}>
                            <Text>Кількість старших пластунів прихильників</Text>
                            <Form.Item
                                className='w100'
                                name={['membersStatistic', 'numberOfSeniorPlastynSupporters']}
                                rules={validationSchema.number}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col
                            xs={24} sm={12} md={24} lg={12}>
                            <Text>Кількість старших пластунів</Text>
                            <Form.Item
                                className='w100'
                                name={['membersStatistic', 'numberOfSeniorPlastynMembers']}
                                rules={validationSchema.number}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
                <Col
                    xs={24} sm={24} md={12} lg={12}
                    className='container'>
                    <Text strong={true}>УПС</Text>
                    <Row
                        gutter={16}
                        align='bottom'>
                        <Col
                            xs={24} sm={12} md={24} lg={12}>
                            <Text>Кількість сеньйорів пластунів прихильників</Text>
                            <Form.Item
                                className='w100'
                                name={['membersStatistic', 'numberOfSeigneurSupporters']}
                                rules={validationSchema.number}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col
                            xs={24} sm={12} md={24} lg={12}>
                            <Text>Кількість сеньйорів пластунів</Text>
                            <Form.Item
                                className='w100'
                                name={['membersStatistic', 'numberOfSeigneurMembers']}
                                rules={validationSchema.number}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <div className='container'>
                <Text strong={true}>Адміністрування та виховництво</Text>
                <Row
                    gutter={16}
                    align='bottom'>
                    <Col
                        xs={24} sm={24} md={8} lg={8}>
                        <Text>Кількість діючих виховників (з усіх членів УСП, УПС)</Text>
                        <Form.Item
                            className='w100'
                            name='numberOfTeachers'
                            rules={validationSchema.number}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col
                        xs={24} sm={24} md={8} lg={8}>
                        <Text>Кількість адміністраторів (в проводах будь якого рівня)</Text>
                        <Form.Item
                            className='w100'
                            name='numberOfAdministrators'
                            rules={validationSchema.number}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col
                        xs={24} sm={24} md={8} lg={8}>
                        <Text>Кількість тих, хто поєднує виховництво та адміністрування</Text>
                        <Form.Item
                            className='w100'
                            name='numberOfTeacherAdministrators'
                            rules={validationSchema.number}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </div>
            <div className='container'>
                <Text strong={true}>Пластприят</Text>
                <Row
                    gutter={16}
                    align='bottom'>
                    <Col
                        xs={24} sm={24} md={8} lg={8}>
                        <Text>Кількість пільговиків</Text>
                        <Form.Item
                            className='w100'
                            name='numberOfBeneficiaries'
                            rules={validationSchema.number}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col
                        xs={24} sm={24} md={8} lg={8}>
                        <Text>Кількість членів Пластприяту</Text>
                        <Form.Item
                            className='w100'
                            name='numberOfPlastpryiatMembers'
                            rules={validationSchema.number}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col
                        xs={24} sm={24} md={8} lg={8}>
                        <Text>Кількість почесних членів</Text>
                        <Form.Item
                            className='w100'
                            name='numberOfHonoraryMembers'
                            rules={validationSchema.number}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </div>
            <div className='container'>
                <Text strong={true}>Залучені кошти</Text>
                <Row
                    gutter={16}
                    align='bottom'>
                    <Col
                        xs={24} sm={24} md={12} lg={6}>
                        <Text>Державні кошти</Text>
                        <Form.Item
                            className='w100'
                            name='publicFunds'
                            rules={validationSchema.number}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col
                        xs={24} sm={24} md={12} lg={6}>
                        <Text>Внески</Text>
                        <Form.Item
                            className='w100'
                            name='contributionFunds'
                            rules={validationSchema.number}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col
                        xs={24} sm={24} md={12} lg={6}>
                        <Text>Пластовий заробіток</Text>
                        <Form.Item
                            className='w100'
                            name='plastSalary'
                            rules={validationSchema.number}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col
                        xs={24} sm={24} md={12} lg={6}>
                        <Text>Спонсорські кошти</Text>
                        <Form.Item
                            className='w100'
                            name='sponsorshipFunds'
                            rules={validationSchema.number}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </div>
            <div className='container'>
                <Text strong={true}>Майно та потреби станиці</Text>
                <Row
                    gutter={16}
                    align='bottom'>
                    <Col
                        xs={24} sm={24} md={12} lg={12}>
                        <Text>Вкажіть, що вам допоможе ефективніше залучати волонтерів та створювати виховні частини (гнізда, курені)</Text>
                        <Form.Item
                            className='w100'
                            name='listProperty'
                            rules={validationSchema.textarea} >
                            <TextArea />
                        </Form.Item>
                    </Col>
                    <Col
                        xs={24} sm={24} md={12} lg={12}>
                        <Text>Вкажіть перелік майна, що є в станиці</Text>
                        <Form.Item
                            className='w100'
                            name='improvementNeeds'
                            rules={validationSchema.textarea} >
                            <TextArea />
                        </Form.Item>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default AnnualReportForm;