import axios from "axios";
import { useEffect, useState } from "react";
import { useRef } from "react";
import "./StudentDetails.css";

const StudentDetails = () => {
  let name1 = useRef();
  let branch1 = useRef();
  let address1 = useRef();
  let age1 = useRef();
  let PhoneNumber1 = useRef();
  let course1 = useRef();
  let id1 = useRef();
  let [data, setdata] = useState([]);
  const [idNum, setIdNum] = useState("");

  //! Data post

  let post =async (e) => {
    e.preventDefault();
    let name = name1.current.value;
    let branch = branch1.current.value;
    let id = id1.current.value;
    let address = address1.current.value;
    let age = age1.current.value;
    let phoneNumber = PhoneNumber1.current.value;
    let course = course1.current.value;
    let data = {
      id,
      name,
      branch,
      address,
      age,
      phoneNumber,
      course,
    };
    console.log(data);
   
     axios.post("http://localhost:4001/posts",data)
        .then((response) => {
          alert(response.data.message);
        })
        .catch((error) => {
          console.log(error.data.message);
        });
        window.location.reload();

 
    console.log(idNum.id);
  };

  // !to get the details from data base
  useEffect(() => {
    let fetchData = async () => {
      let reponse = await axios.get(`http://localhost:4001/posts`);
      let data = await reponse.data;
      setdata(data);
    };

    fetchData();
  }, [data]);

  let deletepost = async (_id, name) => {
    await axios.delete(`http://localhost:4001/posts/${_id}`);
    alert(`${name} will be deleted`);
    window.location.reload();

  };

  //!Edit
  let updatepost = (details) => {
    id1.current.value = details.id;
    name1.current.value = details.name;
    branch1.current.value = details.branch;
    address1.current.value = details.address;
    age1.current.value = details.age;
    PhoneNumber1.current.value = details.phoneNumber;
    course1.current.value = details.course;
    setIdNum(details);
    console.log(details.id);
  };

  //!Update
  let updatepost1 = async () => {
    let id = id1.current.value;
    let name = name1.current.value;
    let branch = branch1.current.value;
    let address = address1.current.value;
    let age = age1.current.value;
    let phoneNumber = PhoneNumber1.current.value;
    let course = course1.current.value;
    let data = {
      id,
      name,
      branch,
      address,
      age,
      phoneNumber,
      course,
    };

    await axios.put(`http://localhost:4001/posts/${id}`, data).then(() => {
      alert("data upadted");
    });
    window.location.reload();

  };
  return (
    <div className="studentdetails">
     <div className="block">
     <h1>Student Details</h1>
      <form action="" onSubmit={post} className="form">
        <div className="id">
          <input type="number" placeholder="id" name="id" ref={id1} />
        </div>
        <div className="name">
          <input type="text" placeholder="name" name="name" ref={name1} />
        </div>
        <div className="branch">
          <input type="text" placeholder="branch" name="branch" ref={branch1} />
        </div>
       
        <div className="address">
          <input
            type="text"
            placeholder="address"
            name="address"
            ref={address1}
          />
        </div>
        <div className="age">
          <input type="number" placeholder="age" name="age" ref={age1} />
        </div>
        <div className="phonenumber">
          <input
            type="text"
            placeholder="phoneNumber"
            name="phoneNumber"
            ref={PhoneNumber1}
          />
        </div>
        <div className="course">
          <input type="text" placeholder="course" name="course" ref={course1} />
        </div>
        <div className="but">
          <button type="submit">Submit</button>
        </div>{" "}
      </form>
<div className="update">
<button onClick={updatepost1}>Update</button>

</div>
     </div>
      <div className="block1" >
        {
          <div className="table">
            <table border="1px">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Branch</th>
                  <th>Address</th>
                  <th>Age</th>
                  <th>PhoneNumber</th>
                  <th>Course</th>
                </tr>
              </thead>
              <tbody>
                {data.map((details) => (
                  <tr>
                    {" "}
                    <td>{details.id}</td>
                    <td>{details.name}</td>
                    <td>{details.branch}</td>
                    <td>{details.address}</td>
                    <td>{details.age}</td>
                    <td>{details.phoneNumber}</td>
                    <td>{details.course}</td>
                    <button
                      onClick={() => deletepost(details._id, details.name)}
                   id="delete" >
                      Delete
                    </button>
                    <button id="update" onClick={() => updatepost(details)}>Edit</button>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  );
};

export default StudentDetails;
