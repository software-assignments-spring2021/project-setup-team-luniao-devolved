import React from 'react';
import Button from 'react-bootstrap/Button';
import './AddFriends.css';

function AddFriend(props) {
    // const [post, setPost] = useState("");
    // const [title, setTitle] = useState("");
    // const [show, setShow] = useState(false);
    // const handleSubmit = (e) => {
    //     console.log("Post submitted");
    //     setShow(true);
    //     e.preventDefault();
    //     // post is saved in `post`
    // }
    // let showFunc = null;
    // if (show === true) {
    //     showFunc = <Alert variant="success" onClose={() => setShow(false)} dismissible> Post submitted.</Alert>;
    // }

    return (
        <section className="main-content">
            <div className="App">
                <div className="input-group">
                    <div className="form-outline">
                    <br />
                        <label class="form-label" for="form1">Search</label>
                        <input type="search" id="form1" class="form-control" />
                    </div>
                </div>
                <div>
                <br />
                    <Button href="/currenttrip">Back</Button>
                    <Button href="/currenttrip">Add</Button>
                </div>
            </div>
        </section>
    );
}
export default AddFriend;