import { useContext } from "react";
import { ProfileContext } from "../SmartShoppingMain";
import { useState } from "react";

const ProfilePage = ({ setProfileDetails }) => {
  const [readOnly, toggleReadOnly] = useState(true);
  const profileDetails = useContext(ProfileContext);
  const inputStyle = {
    boxShadow: !readOnly ? "0 0 0 3px rgba(59, 130, 246, 0.5)" : "",
    padding: "6px",
    border: "none",
    marginLeft:"10px"
  };
  return (
    <div>
      <p>
        Name:
        <input
          style={inputStyle}
          type="text"
          value={profileDetails.name}
          readOnly={readOnly}
          onChange={(e) =>
            setProfileDetails({ ...profileDetails, name: e.target.value })
          }
        />
      </p>
      <p>
        Email:
        <input
          style={inputStyle}
          type="email"
          value={profileDetails.email}
          readOnly={readOnly}
          onChange={(e) =>
            setProfileDetails({ ...profileDetails, email: e.target.value })
          }
        />
      </p>
      <p>
        Address:
        <input
          style={inputStyle}
          type="text"
          value={profileDetails.address}
          readOnly={readOnly}
          onChange={(e) =>
            setProfileDetails({ ...profileDetails, address: e.target.value })
          }
        />
      </p>

      <button onClick={() => toggleReadOnly(!readOnly)}>
        {readOnly === true ? "Edit Profile" : "Save Profile"}
      </button>
    </div>
  );
};

export default ProfilePage;
