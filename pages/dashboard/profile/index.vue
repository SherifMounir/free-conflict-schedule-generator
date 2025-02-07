<template>
    <div class="container-fluid p-0">
        <div class="row g-4 d-flex align-items-stretch">
            <div class="col-xl-12">
                <UiCard class="h-100">
                    <UiCardName :cardName="`Profile`"/>
                    <div class="row mt-3 g-2">
                      <div class="col-2 py-2">
                        <img src="~/assets/images/images.jpg" class="rounded" alt="">
                      </div>
                      <div class="col-6">
                        <b-list-group>
                          <b-list-group-item>alice</b-list-group-item>
                          <b-list-group-item>20 Years Old</b-list-group-item>
                          <b-list-group-item>Grade 1</b-list-group-item>
                          <b-list-group-item>MSA University</b-list-group-item>
                          <b-list-group-item>menana@msa.edu.eg</b-list-group-item>
                        </b-list-group>
                      </div>
                    </div>
                </UiCard>
            </div>

        </div>
    </div>
</template>


<style lang="scss">
  .custom-line-chart {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  .c-line-chart {
    width: 8px;
    margin-left: 1px;
    display: inline-flex;
    -webkit-border-top-left-radius: 10px;
    -webkit-border-top-right-radius: 10px;
    -moz-border-radius-topleft: 10px;
    -moz-border-radius-topright: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .time-line-container {
    .time-line-content {
      display: block;
      height: 50px;
      width: 100%;
      border: 1px solid #eeeeee;
      border-radius: 50px;
      .user-icon {
        width: 50px;
        height: 50px;
        background-color: #4c52bb;
        border-radius: 50px;
      }
    }
  }
  // .icon-data-content-statistics {
  //   width: 50px;
  //   height: 50px;
  //   background-color: #4c52bb;
  //   color: #fff;
  //   border-radius: 100px;
  // }

  .container-filter-search form {
    margin-bottom: 0px !important;
    .button-app {
      width: 100% !important;
      text-align: center;
    }
  }
</style>










<!--
import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import profileImage from "./assets/images/images.jpg"; // Adjust the path accordingly

const Profile = () => {
  return (
    <div className="container-fluid p-0">
      <div className="row g-4 d-flex align-items-stretch">
        <div className="col-xl-12">
          <Card className="h-100 p-3">
            <h5>Profile</h5>
            <div className="row mt-3 g-2">
              <div className="col-2 py-2">
                <img src={profileImage} className="rounded" alt="Profile" />
              </div>
              <div className="col-6">
                <ListGroup>
                  <ListGroup.Item>Alice</ListGroup.Item>
                  <ListGroup.Item>20 Years Old</ListGroup.Item>
                  <ListGroup.Item>Grade 1</ListGroup.Item>
                  <ListGroup.Item>MSA University</ListGroup.Item>
                  <ListGroup.Item>menana@msa.edu.eg</ListGroup.Item>
                </ListGroup>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile; -->
