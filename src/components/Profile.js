import React, { useState } from "react";

const Profile = () => {
  const [details, setDetails] = useState([]);

  return (
    <div className="card-profile">
      <div className="card-header">
        <div className="card-title">
          <h2 className="title">Profile</h2>
        </div>
      </div>
      <div className="card-body">
        Name : <h4 className="name"></h4>
        Email_id : <p className="email"></p>
      </div>
    </div>
  );
};

export default Profile;
