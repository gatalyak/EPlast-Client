import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
//import classes from "../../Actions/ActionEvent/EventUser/EventUser.module.css";
import classes from './ActiveMembership.module.css'
import { Avatar, Typography, List, Button } from 'antd';
import activeMembershipApi, { PlastDegree, UserPlastDegree } from '../../../api/activeMembershipApi';
import userApi from '../../../api/UserApi';
import AuthStore from '../../../stores/AuthStore';
import jwt from 'jwt-decode';
import ModalAddPlastDegree from './PlastDegree/ModalAddPlastDegree';
const { Title } = Typography;

const ActiveMembership = () => {
    const { userId } = useParams();
    const [imageBase64, setImageBase64] = useState<string>();
    const [accessLevels,setAccessLevels ] = useState([]);
    const [user, setUser] = useState<any>({});
    const [plastDegrees, setPlastDegrees] = useState<Array<UserPlastDegree>>([]);
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const [userToken, setUserToken] = useState<any>([{
        nameid: ''
    }]);
    const handleAddDegree = async() =>{
        await activeMembershipApi.getUserPlastDegrees(userId).then(response =>{
            setPlastDegrees(response);
        }); 
    }
    const handleDeleteUserPlastDegree = (plastDegreeId : number)=>{
        setPlastDegrees(plastDegrees.filter(pd => pd.plastDegree.id == plastDegreeId))
    }
    const fetchData  =  async () =>{
        const token = AuthStore.getToken() as string;
            setUserToken(jwt(token));
        setAccessLevels(await activeMembershipApi.getAccessLevelById(userId));
        await userApi.getById(userId).then(async response => {
            setUser(response.data.user)
           
            await userApi.getImage(response.data.user.imagePath).then((response: { data: any; }) => {
                setImageBase64(response.data);
            })
        });
       await activeMembershipApi.getUserPlastDegrees(userId).then(response =>{
           setPlastDegrees(response);
       }) 
    };
    const handleDelete = async (userPlastDegree : UserPlastDegree) =>{
       await activeMembershipApi.removeUserPlastDegree(userId, userPlastDegree.plastDegree.id);  
      handleDeleteUserPlastDegree(userPlastDegree.plastDegree.id);
    }
    const showModal = () => setVisibleModal(true);
    useEffect(()=>{
        fetchData();
    },[]);
return <div className={classes.wrapper} >
                <div className={classes.wrapperImg}>
                    <Avatar size={250} src={imageBase64} />
                    <Title level={2}> {user.firstName} {user.lastName} </Title>
                < div className={classes.line} id={classes.line} />
                <Button type="primary" onClick={showModal}>
                Додати ступінь
              </Button>
                </div>
        <div className={classes.wrapperCol} >
        <div className={classes.wrapper}>
        <div className={classes.wrapper2}>

             </div>
        </div>
        <div className={classes.wrapper}>
        <div className={classes.wrapper2}> 
        <Title level={2}> Рівні доступу користувача </Title>      
             <div className={classes.line} />
            <List
            dataSource = {accessLevels}
            renderItem={item => <List.Item style ={ {fontSize : "20px"}}>{item}</List.Item> } />
           
        </div>
        </div>
        <div className={classes.wrapper}>
        <div className={classes.wrapperPlastDegree}>
        <Title level={2}> Ступені користувача </Title>      
             <div className={classes.line} />
            <List
            className="demo-loadmore-list"
            dataSource = {plastDegrees}
            renderItem={item => (<List.Item actions={[<a onClick ={()=>{
                handleDelete(item);
            }} key="list-loadmore-delete">Видалити</a>]}>
                <List.Item.Meta  style ={ {fontSize : "20px"} }title = {item.plastDegree.name} description = {`Дата надання ступеню ${item.dateStart}`}></List.Item.Meta></List.Item>) }
            itemLayout="horizontal" />
            
             </div>
        </div>
        </div>
        <ModalAddPlastDegree 
        handleAddDegree = {handleAddDegree}
        handleDeleteUserPlastDegree ={handleDeleteUserPlastDegree}
        userId = {userId} 
        visibleModal = {visibleModal}
        setVisibleModal ={setVisibleModal}/>
</div>;
}
export default ActiveMembership;