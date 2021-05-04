import './EditProfile.css'
import axios from 'axios'
import { useEffect, useState, Component } from 'react';
import { Alert, Button } from 'react-bootstrap';

function EditProfile(){
//first we want to display the original data from the user

const [user, setUserData] = useState({});

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

const handleSubmit = (e) => {
    e.preventDefault();


}

















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


    return(
        <div className="editprofile">
        <h3 class="text-center">
            Edit Profile
        </h3>
        <form>
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
            <input type="email" class="form-control" id="exampleInputEmail1" placeholder="New Email"></input>
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
            <input type="file" id="exampleInputFile"></input>
        </div>
        <div class="container">
            <div class="col-sm-12 text-center">
                    <Button type="submit" variant="outline-success" className="buttons">Confirm Changes</Button>
                    <Button type="submit" variant="outline-danger" href="/profile" className="buttons">Cancel Changes</Button>
            </div>
        </div>
        </form>
        </div>
    );
}

export default EditProfile;


/*    <div className="editprofile">
        <h3 class="text-center">
            Edit Profile
        </h3>
        <form>
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
            <input type="email" class="form-control" id="exampleInputEmail1" placeholder="New Email" value={newEmail} onChange={this.onChangeEmail}></input>
        </div>
        <div className="formgroup">
            <label for="exampleInputPassword1"></label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="New Password" value={newPW} onChange={this.onChangePW}></input>
        </div>
        <div className="formgroup">
            <label for="exampleInputPassword1"></label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Reenter Password" value={rePW}></input>
        </div>
        <div className="formgroup">
            <label for="exampleInputFile" onChange={(e) => setSelectedFile(e.target.files[0])} >Upload Profile Picture</label>
            <input type="file" id="exampleInputFile"></input>
        </div>
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col-1.5">
                <Link to="/Profile">Confirm Changes</Link>
                </div>
                <div class="col-1">
                <Link to="/Profile">Cancel</Link>
                </div>
            </div>
        </div>
        </form>
        </div>
*/
























// //export default EditProfile;

//Old EditProfile code
// // /*class UserForm extends Component{

// //     constructor(){
// //         super()
// //         this.state = {
// //             newEmail: '',
// //             oldPW: '',
// //             newPW: '',
// //         };
// //     }

// //     onChange = (e) => {
// //         this.setState({[e.target.name]: e.target.value});
// //     }

// //     onSubmit = (e) => {
// //         e.preventDefault()
// //         const {newEmail, oldPW, newPW} = this.state;

// //         axios.post('http://localhost:4000/api/EditProfile', {newEmail, oldPW, newPW})
// //             .then((result) => {

// //             });
// //     }

// // }
// // */

// function EditProfile() {
//     // //useState - email, password 
//     // //const [currentId, setCurrentId] = useState(0);
//     // const [newEmail, setEmail] = useState("");
//     // const [newPW, setPW] = useState("");
//     // const [newPFP, setSelectedFile] = useState(null);
//     // /*
//     //     constructor();{
//     //         super();
//     //         this.state = {
//     //             newEmail: '',
//     //             newPW: '',
//     //             rePW: '',
//     //         };
//     //     }
//     // */
//     // //one onChange for each- pw and email
//     // onChangeEmail = (e) => {
//     //     this.setEmail({ [e.target.name]: e.target.value });
//     // }

//     // onChangePW = (e) => {
//     //     this.setPW({ [e.target.name]: e.target.value });
//     // }

//     // onSubmit = (e) => {
//     //     e.preventDefault()
//     //     const { newEmail, newPW, newPFP } = this.state;
//     //     //check that the passwords are the same, send only one password
//     //     if (newPW === rePW) {
//     //         axios.post('http://localhost:4000/api/EditProfile', { newEmail, newPW, newPFP })
//     //             .then((result) => {

//     //             });
//     //     }

//     // }

//     // const [user, setData] = useState([]);

//     // useEffect(() => {
//     //     // a nested function that fetches the data
//     //     async function fetchData() {
//     //         // axios is a 3rd-party module for fetching data from servers
//     //         const result = await axios(
//     //             // retrieving some mock data about users
//     //             "https://my.api.mockaroo.com/users.json?key=4e1c2150"
//     //         );
//     //         // set the state variable
//     //         // this will cause a re-render of this component
//     //         setData(result.data);
//     //         console.log(result.data)
//     //     }

//     //     // fetch the data!
//     //     fetchData();
//     //     // the blank array below causes this callback to be executed only once on component load
//     // }, []);


//     return (
//         <div className="editprofile">
//             <h1 class="text-center">
//                 Edit Profile
//         </h1>
//             <form>
//                 <div className="formgroup">
//                     <label for="exampleInputEmail1"></label>
//                     <input class="form-control" type="text" placeholder={user["first_name"]} aria-label="Disabled input example" disabled></input>
//                 </div>
//                 <div className="formgroup">
//                     <label for="exampleInputEmail1"></label>
//                     <input class="form-control" type="text" placeholder={user["dob"]} aria-label="Disabled input example" disabled></input>
//                 </div>
//                 <div className="formgroup">
//                     <label for="exampleInputEmail1"></label>
//                     <input class="form-control" type="text" placeholder={user["email"]} aria-label="Disabled input example" disabled></input>
//                 </div>
//                 <div className="formgroup">
//                     <label for="exampleInputEmail1"></label>
//                     <input type="email" class="form-control" id="exampleInputEmail1" placeholder="New Email" value={newEmail} onChange={this.onChangeEmail}></input>
//                 </div>
//                 <div className="formgroup">
//                     <label for="exampleInputPassword1"></label>
//                     <input type="password" class="form-control" id="exampleInputPassword1" placeholder="New Password" value={newPW} onChange={this.onChangePW}></input>
//                 </div>
//                 <div className="formgroup">
//                     <label for="exampleInputPassword1"></label>
//                     <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Reenter Password" value={rePW}></input>
//                 </div>
//                 <div className="formgroup">
//                     <label for="exampleInputFile" onChange={(e) => setSelectedFile(e.target.files[0])} >Upload Profile Picture</label>
//                     <input type="file" id="exampleInputFile"></input>
//                 </div>
//                 <div class="container">
//                     <div class="row justify-content-md-center">
//                         <div class="col-1.5">
//                             <Link to="/Profile">Confirm Changes</Link>
//                         </div>
//                         <div class="col-1">
//                             <Link to="/Profile">Cancel</Link>
//                         </div>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// }

// */
