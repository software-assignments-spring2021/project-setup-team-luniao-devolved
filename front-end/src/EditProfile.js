import './EditProfile.css'
import axios from 'axios'
import { useEffect, useState, Component } from 'react';

/*class UserForm extends Component{

    constructor(){
        super()
        this.state = {
            newEmail: '',
            oldPW: '',
            newPW: '',
        };
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault()
        const {newEmail, oldPW, newPW} = this.state;
        
        axios.post('http://localhost:4000/api/EditProfile', {newEmail, oldPW, newPW})
            .then((result) => {

            });
    }

}
*/


function EditProfile(){

    constructor();{
        super();
        this.state = {
            newEmail: '',
            newPW: '',
            rePW: '',
        };
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault()
        const {newEmail, newPW, rePW} = this.state;
        
        axios.post('http://localhost:4000/api/EditProfile', {newEmail, newPW, rePW})
            .then((result) => {

            });
    }

    const [user, setData] = useState([]);

    useEffect(() => {
      // a nested function that fetches the data
      async function fetchData() {
        // axios is a 3rd-party module for fetching data from servers
        const result = await axios(
          // retrieving some mock data about users
          "https://my.api.mockaroo.com/users.json?key=4e1c2150"
        );
        // set the state variable
        // this will cause a re-render of this component
        setData(result.data);
        console.log(result.data)
      }
  
      // fetch the data!
      fetchData();
      // the blank array below causes this callback to be executed only once on component load
    }, []);


    return(
        <div className="editprofile">
        <h1 class="text-center">
            Edit Profile
        </h1>
        <form>
        <div className="formgroup">
            <label for="exampleInputEmail1"></label>
            <input class="form-control" type="text" placeholder={user["first_name"]} aria-label="Disabled input example"  disabled></input>
        </div>
        <div className="formgroup">
            <label for="exampleInputEmail1"></label>
            <input class="form-control" type="text" placeholder={user["dob"]} aria-label="Disabled input example" disabled></input>
        </div>
        <div className="formgroup">
            <label for="exampleInputEmail1"></label>
            <input class="form-control" type="text" placeholder={user["email"]} aria-label="Disabled input example" disabled></input>
        </div>
        <div className="formgroup">
            <label for="exampleInputEmail1"></label>
            <input type="email" class="form-control" id="exampleInputEmail1" placeholder="New Email" value={newEmail} onChange={this.onChange}></input>
        </div>
        <div className="formgroup">
            <label for="exampleInputPassword1"></label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="New Password" value={newPW} onChange={this.onChange}></input>
        </div>
        <div className="formgroup">
            <label for="exampleInputPassword1"></label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Reenter Password" value={rePW} onChange={this.onChange}></input>
        </div>
        <div className="formgroup">
            <label for="exampleInputFile">Upload Profile Picture</label>
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
    );
}

export default EditProfile;

//Alt navbar code
/* <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Travel Wise</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Dashboard</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#">New Trip</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#">Current Trip</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#">Past Trips</a>
                    </li>
                    <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Profile
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <li><a class="dropdown-item" href="#">View Profile</a></li>
                        <li><a class="dropdown-item" href="#">Edit Profile</a></li>
                        <li><a class="dropdown-item" href="#">Sign Out</a></li>
                    </ul>
                    </li>
                </ul>
                </div>
            </div>
            </nav>
*/
