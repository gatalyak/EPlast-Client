import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Avatar, Modal, Button, Typography, Badge, Space, Spin, Tooltip, Switch, Drawer, Tag, Input } from 'antd';
import eventUserApi from '../../../../api/eventUserApi';
import EventsUser from '../../../../models/EventUser/EventUser';
import classes from './EventUser.module.css';
import userApi from '../../../../api/UserApi';
import AuthStore from '../../../../stores/AuthStore';
import jwt from 'jwt-decode';
import { CalendarOutlined, NotificationTwoTone, ToolTwoTone, FlagTwoTone, LoadingOutlined } from '@ant-design/icons';
import moment from 'moment';
import EventCreateDrawer from '../EventCreate/EventCreateDrawer';
import EventEditDrawer from '../EventEdit/EventEditDrawer';
import EventCalendar from '../EventCalendar/EventCalendar';
import Spinner from '../../../Spinner/Spinner';
import CreatedEvents from '../../../../models/EventUser/CreatedEvents';
const { Title } = Typography;

const EventUser = () => {

    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [imageBase64, setImageBase64] = useState<string>();
    const [createdEventsModal, setCreatedEventsModal] = useState(false);
    const [plannedEventsModal, setPlannedEventsModal] = useState(false);
    const [visitedEventsModal, setVisitedEventsModal] = useState(false);
    const { userId } = useParams();
    const [allEvents, setAllEvents] = useState<EventsUser>(new EventsUser());
    const [createdEvents, setCreatedEvents] = useState<CreatedEvents[]>([new CreatedEvents()]);
    const [showEventCreateDrawer, setShowEventCreateDrawer] = useState(false);
    const [showEventCalendarDrawer, setShowEventCalendarDrawer] = useState(false);
    const [showEventEditDrawer, setShowEventEditDrawer] = useState(false);
    const [eventId, setEventId] = useState<number>();
    const [userToken, setUserToken] = useState<any>([{
        nameid: ''
    }]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const token = AuthStore.getToken() as string;
        setUserToken(jwt(token));
        await eventUserApi.getEventsUser(userId).then(async response => {
            setCreatedEvents(response.data);
            setAllEvents(response.data);
            await userApi.getImage(response.data.user.imagePath).then((response: { data: any; }) => {
                setImageBase64(response.data);
            })
            setLoading(true);
        })
    }

    const setEventTypeName = (typeId: number) => {
        let name = '';
        if (typeId === 1) {
            name = 'Акція';
        }
        if (typeId === 2) {
            name = 'Вишкіл';
        }
        if (typeId === 3) {
            name = 'Табір';
        }
        return name;
    }

    const setEventColor = (typeId: number) => {
        let color = '';
        if (typeId === 1) {
            color = "#6f8ab5";
        }
        if (typeId === 2) {
            color = "#fdcb02";
        }
        if (typeId === 3) {
            color = "#c01111";
        }
        return color;
    }

    const closeEventCalendarDrawer = () => setShowEventCalendarDrawer(false);

    const [searchedData, setSearchedData] = useState('');

    // const filter = allEvents.createdEvents.filter(item => {
    //     return item.eventName.toLocaleLowerCase().includes(searchedData.toLocaleLowerCase());
    // });

    const filter = searchedData
        ? allEvents.createdEvents?.filter((item: any) => {
            return Object.values(item).find((element) => {
                return String(element).toLowerCase().includes(searchedData.toLowerCase());
            });
        })
        : allEvents.createdEvents;

    const handleSearch = (event: any) => {
        setSearchedData(event.target.value);
    };

    const newLocal = '#3c5438';
    return loading === false ? (
        <Spinner />
    ) : (
            <div className={classes.wrapper} >
                <div className={classes.wrapperImg}>
                    <Avatar className={classes.avatar} size={300} src={imageBase64} />
                    <Title level={2}> {allEvents?.user.firstName} {allEvents?.user.lastName} </Title>
                    < div className={classes.line} />
                    {userToken.nameid === userId && allEvents?.createdEvents.length !== 0 &&
                        < Button type="primary" className={classes.button} onClick={() => setShowEventCreateDrawer(true)} >
                            Створити подію
                        </Button>}
                </div>
                < div className={classes.wrapperCol} >
                    <div className={classes.wrapper}>
                        <div className={classes.wrapper2}>
                            <Title level={2}> Відвідані події </Title>
                            < div className={classes.line} />
                            {allEvents.visitedEvents?.length === 0 && userToken.nameid !== userId &&
                                <h2>{allEvents?.user.firstName} {allEvents?.user.lastName} ще не відвідав(ла) жодної події</ h2 >
                            }
                            {allEvents?.visitedEvents?.length === 0 && userToken.nameid === userId &&
                                <h2>Ви ще не відвідали жодної події</ h2 >
                            }
                            {allEvents?.visitedEvents?.length !== 0 &&
                                <div>
                                    <Badge count={allEvents?.visitedEvents?.length} style={{ backgroundColor: newLocal }} />
                                    <br />
                                    < Button type="primary" className={classes.button} onClick={() => setVisitedEventsModal(true)
                                    }>
                                        Список
                                    </Button>
                                </div>}
                            < Modal
                                title="Відвідані події"
                                centered
                                visible={visitedEventsModal}
                                className={classes.modal}
                                onCancel={() => setVisitedEventsModal(false)}
                                footer={
                                    [
                                        <Button type="primary" className={classes.button} onClick={() => setVisitedEventsModal(false)
                                        } > Закрити </Button>
                                    ]}
                            >
                                {allEvents?.visitedEvents?.map((item: any) =>
                                    <div>
                                        <h1>{item.eventName} </ h1 >
                                        < h2 > Дата початку: {moment(item.eventDateStart).format("DD-MM-YYYY HH:mm")} </h2>
                                        < h2 > Дата завершення: {moment(item.eventDateEnd).format("DD-MM-YYYY HH:mm")} </h2>
                                        < Button type="primary" className={classes.button} id={classes.button} onClick={() => history.push(`/events/${item.id}/details`)} >
                                            Деталі
                                        </Button>
                                        < hr />
                                    </div>)}
                            </Modal>
                        </div>
                        < div className={classes.wrapper3} >
                            <Title level={2}> Створені події </Title>
                            < div className={classes.line} />
                            {allEvents.createdEvents.length !== 0 &&
                                <div>
                                    <Badge count={allEvents.createdEvents.length} style={{ backgroundColor: '#3c5438' }} />
                                    <br />
                                    < Button type="primary" className={classes.button} onClick={() => setCreatedEventsModal(true)
                                    } >
                                        Список
                                </Button>
                                </div>}
                            {userToken.nameid === userId && allEvents.createdEvents.length === 0 &&
                                <div>
                                    <h2>Ви ще не створили жодної події</ h2 >
                                    < Button type="primary" className={classes.button} onClick={() => setShowEventCreateDrawer(true)} >
                                        Створити подію
                                    </Button>
                                </div>}

                            <EventCreateDrawer
                                visibleEventCreateDrawer={showEventCreateDrawer}
                                setShowEventCreateDrawer={setShowEventCreateDrawer}
                                onCreate={fetchData}
                            />

                            {userToken.nameid !== userId && allEvents.createdEvents.length === 0 &&
                                < div >
                                    <h2>{allEvents?.user.firstName} {allEvents?.user.lastName} ще не створив(ла) жодної події</ h2 >
                                </div>
                            }
                            < Modal
                                title="Створені події"
                                centered
                                visible={createdEventsModal}
                                className={classes.modal}
                                onCancel={() => setCreatedEventsModal(false)}
                                footer={
                                    [
                                        <div className={classes.modalFooter}>
                                            <Button type="primary" className={classes.button} onClick={() => setCreatedEventsModal(false)}>
                                                Закрити
                                        </Button>
                                        </div>
                                    ]}
                            >
                                <Input.Search placeholder="Пошук" onChange={handleSearch} enterButton />
                                {filter.map((item: any) =>
                                    <div>
                                        {item.eventStatusID === 3 &&
                                            <div className={classes.modalContent}>
                                                <h1>{item.eventName} </ h1 >
                                                <Tag color={setEventColor(item.eventTypeID)} className={classes.eventTag}>
                                                    {setEventTypeName(item.eventTypeID)}
                                                </Tag>
                                                <Tooltip title="Затверджено">
                                                    <NotificationTwoTone className={classes.icon} twoToneColor={newLocal} key="approved" />
                                                </Tooltip>
                                            </div>}
                                        {item.eventStatusID === 2 &&
                                            <div className={classes.modalContent}>
                                                <h1>{item.eventName} </ h1 >
                                                <Tag color={setEventColor(item.eventTypeID)} className={classes.eventTag}>
                                                    {setEventTypeName(item.eventTypeID)}
                                                </Tag>
                                                <Tooltip title="Не затверджено">
                                                    <ToolTwoTone className={classes.icon} twoToneColor={newLocal} key="notApproved" />
                                                </Tooltip>
                                            </div>}
                                        {item.eventStatusID === 1 &&
                                            <div className={classes.modalContent}>
                                                <h1>{item.eventName} </ h1 >
                                                <Tag color={setEventColor(item.eventTypeID)} className={classes.eventTag}>
                                                    {setEventTypeName(item.eventTypeID)}
                                                </Tag>
                                                <Tooltip title="Затверджено">
                                                    <FlagTwoTone className={classes.icon} twoToneColor={newLocal} key="approved" />
                                                </Tooltip>
                                            </div>}
                                        < h2 > Дата початку: {moment(item.eventDateStart).format("DD-MM-YYYY HH:mm")} </h2>
                                        < h2 > Дата завершення: {moment(item.eventDateEnd).format("DD-MM-YYYY HH:mm")} </h2>
                                        < Button type="primary" className={classes.button} id={classes.button} onClick={() => history.push(`/events/${item.id}/details`)} >
                                            Деталі
                                        </Button>
                                        {item.eventStatusID !== 1 && userToken.nameid === userId &&
                                            < Button type="primary" className={classes.button} id={classes.button} onClick={() => { setShowEventEditDrawer(true); setEventId(item.id); }}>
                                                Редагувати
                                            </Button>}
                                        < hr />
                                    </div>)}
                                <EventEditDrawer
                                    id={eventId!}
                                    visibleEventEditDrawer={showEventEditDrawer}
                                    setShowEventEditDrawer={setShowEventEditDrawer}
                                    onEdit={fetchData} />
                            </Modal>
                        </div>
                    </div>
                    <div className={classes.wrapper}>
                        < div className={classes.wrapper4} >
                            <Title level={2} className={classes.sectionTitle} > Заплановані події </Title>
                            < div className={classes.line} />
                            {allEvents?.planedEvents?.length === 0 && userToken.nameid === userId &&
                                <div>
                                    <h2>Ви ще не запланували жодної події</ h2 >
                                    <Button type="primary" className={classes.button} id={classes.subcribeButton} onClick={() => history.push('/events/types')} >
                                        Зголоситись на подію
                                </Button>
                                </div>}
                            {allEvents?.planedEvents?.length === 0 && userToken.nameid !== userId &&
                                <h2>{allEvents?.user.firstName} {allEvents?.user.lastName} ще не запланував(ла) жодної події</ h2 >}
                            {allEvents?.planedEvents?.length !== 0 && <div>
                                <Badge count={allEvents?.planedEvents?.length} style={{ backgroundColor: '#3c5438' }} />
                                <br />
                                < Button type="primary" className={classes.button} onClick={() => setPlannedEventsModal(true)
                                }>
                                    Список
                                </Button>
                            </div>}
                            < Modal
                                title="Заплановані події"
                                centered
                                visible={plannedEventsModal}
                                className={classes.modal}
                                onCancel={() => setPlannedEventsModal(false)}
                                footer={
                                    [
                                        <Button type="primary" className={classes.button} id={classes.subcribeButton} onClick={() => history.push('/events/types')} >
                                            Зголоситись на подію
                                        </Button>,
                                        < Button type="primary" className={classes.button} onClick={() => setPlannedEventsModal(false)}>
                                            Закрити
                                        </Button>
                                    ]}
                            >
                                {allEvents?.planedEvents?.map((item: any) => <div>
                                    <h1>{item.eventName} </ h1 >
                                    < h2 > Дата початку: {moment(item.eventDateStart).format("DD-MM-YYYY HH:mm")} </h2>
                                    < h2 > Дата завершення: {moment(item.eventDateEnd).format("DD-MM-YYYY HH:mm")} </h2>
                                    < Button type="primary" className={classes.button} id={classes.button} style={{ marginLeft: 160 }} onClick={() => history.push(`/events/${item.id}/details`)}>
                                        Деталі
                                    </Button>
                                    < hr />
                                </div>)}
                            </Modal>
                        </div>
                        < div className={classes.wrapper5} >
                            <Title level={2} className={classes.sectionTitle} > Календар подій </Title>
                            < div className={classes.line} />
                            <CalendarOutlined style={{ fontSize: '23px', marginBottom: "7.5px" }} />
                            < Button type="primary" className={classes.button} onClick={() => setShowEventCalendarDrawer(true)}>
                                Переглянути
                            </Button>
                        </div>
                        <Drawer
                            title="Календар подій"
                            width="auto"
                            onClose={closeEventCalendarDrawer}
                            visible={showEventCalendarDrawer}
                            footer={null}
                            forceRender={true}
                        >
                            <EventCalendar
                            />
                        </Drawer >
                    </div>
                </div>
            </div >

        );
}

export default EventUser;