<template>
  <div class="container-fluid p-0">
    <div class="row g-4 d-flex align-items-stretch">
      <div class="col-xl-12">
        <UiCard class="h-100">
          <UiCardName :cardName="`Home`" />
          <div class="text-center mt-3">
            <h1>Welcome {{ userName }} </h1>
            <h1>your Id {{ userId }} </h1>
            <p>Your GPA is {{ userGPA }} </p>
            <p>You are currently at level {{ userLevel }} </p>
          </div>
        </UiCard>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: null,
      userGPA: null,
      userLevel: null,
      userId: null,
    };
  },
  mounted() {
    const userData = JSON.parse(localStorage.getItem("userData")); // Retrieve data from localStorage
    if (userData) {
      this.userName = userData.name;
      this.userGPA = userData.gpa;
      this.userLevel = userData.level;
      this.userId = userData.id;
    }
  },
};
</script>








<!--
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

const Home = () => {
  const [userName, setUserName] = useState(null);
  const [userGPA, setUserGPA] = useState(null);
  const [userLevel, setUserLevel] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setUserName(userData.name);
      setUserGPA(userData.gpa);
      setUserLevel(userData.level);
    }
  }, []);

  return (
    <div className="container-fluid p-0">
      <div className="row g-4 d-flex align-items-stretch">
        <div className="col-xl-12">
          <Card className="h-100 p-3 text-center">
            <h5>Home</h5>
            <div className="mt-3">
              <h1>Welcome {userName}</h1>
              <p>Your GPA is {userGPA}</p>
              <p>You are currently at level {userLevel}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home; -->
