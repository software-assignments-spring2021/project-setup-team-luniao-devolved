import './EditProfile.css'
import axios from 'axios'
import { useEffect, useState} from 'react';
import { Alert, Button, Form, Container } from 'react-bootstrap';

function EditProfile(){
//first we want to display the original data from the user

const [user, setUserData] = useState({});
const [newEmail, setEmail] = useState("");
const [password, setPassword] = useState("");
const [rePassword, setRePassword] = useState("");
const [show, setShow] = useState(false);


useEffect(() => {
    axios({
        method: "GET",
        url: "http://localhost:4000/api/EditProfile",
        headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${localStorage.getItem('JWT')}`
        }
    }).then(user => {
        console.log(user.data);
        setUserData(user.data);
        });

        axios({
            method: "GET",
            url: "http://localhost:4000/api/userinfo",
            headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${localStorage.getItem('JWT')}`
            }
        }).then(user => {
            console.log(user.data);
            setUserData(user.data);
        });

    }, []);

//Now we want to be able to update the user's email and password

//one onChange for each- pw and email
    const onChangeEmail = (e) => {
        this.setEmail({[e.target.name]: e.target.value});
    }

    const onChangePW = (e) => {
        this.setPassword({[e.target.name]: e.target.value});
    }

const handleSubmit = (e) => {
    e.preventDefault();
    

    let newData = new Object();
    newData.email = newEmail;
    newData.pw = password;


    axios({
        method: "POST",
        url: "http://localhost:4000/api/EditProfile",
        data: newData,
        headers: {"Content-Type": "application/json", Authorization: `JWT ${localStorage.getItem('JWT')}`}
    })
    .then(function(res){
        if (res.data === "success") {
            console.log("success");
            // setRedirect(true);
            setShow(true);
        }
    })
    .catch(function(res) {
        console.log(res);
    });
}

let showFunc = null;
if (show === true){
    showFunc = <Alert variant="success" onClose={() => setShow(false)} dismissible>Profile Updated Successfully! Click <Alert.Link href="/logout">here</Alert.Link> to login again.</Alert>;
}

    return(
        <Container className="p-3">
            {showFunc}
            <h3>Edit Profile</h3>
            <Form onSubmit={e => {handleSubmit(e) }}>
                <div className="editprofile">
                        <div className="formgroup">
                            <label for="exampleInputEmail1"></label>
                            <input class="form-control" type="text" placeholder={user["fullname"]} aria-label="Disabled input example"  disabled></input>
                        </div>
                <div className="formgroup">
                    <label for="exampleInputEmail1"></label>
                        <input class="form-control" type="text" placeholder={user["email"]} aria-label="Disabled input example" disabled></input>
                </div>
                <div className="formgroup">
                    <label for="exampleInputEmail1"></label>
                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="New Email" value={newEmail} onChange={e => { setEmail(e.target.value) }}></input>
                </div>
                <div className="formgroup">
                    <label for="exampleInputPassword1"></label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="New Password"></input>
                </div>
                <div className="formgroup">
                    <label for="exampleInputPassword1"></label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Reenter Password"></input>
                </div>
                <div className="formgroup">
                        {/* <label for="exampleInputFile" onChange={(e) => setSelectedFile(e.target.files[0])} >Upload Profile Picture</label> */}
                        {/* <input type="file" id="exampleInputFile"></input> */}
                </div>
                <div class="container">
                    <div class="col-sm-12 text-center">
                        <Button type="submit" variant="outline-success" className="buttons">Confirm Changes</Button>
                        <Button type="submit" variant="outline-danger" href="/profile" className="buttons">Cancel Changes</Button>
                    </div>
                </div>
            
                </div>
            </Form>
        </Container>
    );
}

export default EditProfile;




// //useState - email, password 
// //const [currentId, setCurrentId] = useState(0);
// const [newEmail, setEmail] = useState("");
// const [newPW, setPW] = useState("");
// const [newPFP, setSelectedFile] = useState(null);
// /*
//     constructor();{
//         super();
//         this.state = {
//             newEmail: '',
//             newPW: '',
//             rePW: '',
//         };
//     }
// */
// //one onChange for each- pw and email
//     const onChangeEmail = (e) => {
//         this.setEmail({[e.target.name]: e.target.value});
//     }

//     const onChangePW = (e) => {
//         this.setPW({[e.target.name]: e.target.value});
//     }

//     const onSubmit = (e) => {
//         e.preventDefault() 
//         const {newEmail, newPW, newPFP} = this.state;
//         //check that the passwords are the same, send only one password
//         if (newPW === rePW){
//         axios.post('http://localhost:4000/api/EditProfile', {newEmail, newPW, newPFP})
//             .then((result) => {

//             });
//         }
            
//     }

//     const [user, setData] = useState([]);

//     useEffect(() => {
//       // a nested function that fetches the data
//       async function fetchData() {
//         // axios is a 3rd-party module for fetching data from servers
//         const result = await axios(
//           // retrieving some mock data about users
//           "https://my.api.mockaroo.com/users.json?key=4e1c2150"
//         );
//         // set the state variable
//         // this will cause a re-render of this component
//         setData(result.data);
//         console.log(result.data)
//       }
  
//       // fetch the data!
//       fetchData();
//       // the blank array below causes this callback to be executed only once on component load
//     }, []);







