import {React, useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import './AddFriends.css';
import axios from 'axios'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { Alert } from 'react-bootstrap';

const animatedComponents = makeAnimated();


function AddFriend(props) {

    const [friends, setFriends] = useState([]);
    const [friendsout, setFriendsout] = useState([]);
    const [show, setShow] = useState(false);

    function submitFriends() {
        axios({
            method: "post",
            url: "http://localhost:4000/api/adduserscurrenttrip",
            data: friendsout,
            headers: { "Content-Type": "application/json", Authorization: `JWT ${localStorage.getItem('JWT')}`},
          })
            .then(function (res) {
             console.log(res);
             
            })
            .catch(function (res) {
              //handle error
              console.log(res);
            });
        
            setShow(true);

    }

    const handleMultiChange = (e) =>{
        setFriendsout(e);
    }

    console.log(friendsout);

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:4000/api/friends",
            headers: {
              "Content-Type": "application/json",
              Authorization: `JWT ${localStorage.getItem('JWT')}`
            }
          }).then(friends => {
            let newf = [];
            friends.data.map(e => {
                let temp = new Object();
                temp['value'] = e.email;
                temp['label'] = e.fullname;
                newf.push(temp);
            });
            
            setFriends(newf);
          });

        // setFriends([{value:'One',selected:true},{value:'Two'},{value:'Three'},{value:'Four',label:'Four Label'}]);

      }, []);

      let showSaved = null;
    if (show === true) {
        showSaved = <Alert variant="success" onClose={() => setShow(false)} dismissible>Friend added!</Alert>;
    }

    return (
        <section className="main-content">
            
                
                <div><h3>Add Friends to Current Trip</h3></div>

                <br/>
                {showSaved}
                <br/> 

                Select your friends:


                <div class="addfriendsml" > 
                    <Select closeMenuOnSelect={false} components={animatedComponents} options={friends} onChange={handleMultiChange} isMulti />
                </div>
                    
                <div > 
                    <Button variant="primary" type="submit" onClick={submitFriends}>
                    Add
                    </Button>
                </div>

                <div class="add-friend-backbtn">
                <br />
                    <Button href="/currenttrip">Back</Button>

                    {/* <Button href="/currenttrip">Add</Button> */}

                </div>
                
            
            
        </section>
    );
}
export default AddFriend;