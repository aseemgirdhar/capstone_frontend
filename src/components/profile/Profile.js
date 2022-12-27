import React  , { useState , useContext , useEffect } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import UserContext from "../../context/UserContext"
import { getSingleStudent } from "../../api/Api";

const Profile = () => {
  const [getStudent, setGetStudent] = useState([]);

  const ctx = useContext(UserContext)
  const userId = ctx.manage.userdetails._id
  console.log(userId)
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  useEffect(() => {
    console.log("effect" , userId)

    setTimeout(() => {
      getSingleStudent(`${userId}`)
      .then((res) => res)
      .then((getStudent) => console.log(getStudent))
      .catch((err) => {
        console.log(err);
      });
    }, 2000);
  }, [userId]);
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
      <Card sx={{ minWidth: 275, maxWidth: 540, margin: "auto" }}>
        <CardContent>
          <div className="profile-wrapper">
            {/* {getStudent.fullName} */}
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
