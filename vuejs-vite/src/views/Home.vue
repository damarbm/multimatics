<script setup>
import { ref, onMounted, reactive } from "vue";
import axios from "axios";

const initialProductState = {
  name: "",
  price: "",
  livestock: "",
};

const product = reactive({ ...initialProductState });
const products = ref([]);
const employees = ref([]);

const getAllProducts = async () => {
  try {
    const productsResponse = await axios.get("http://localhost:5001/products");
    products.value = productsResponse.data;
  } catch (error) {
    console.error(error.message);
  }
};

const submitForm = async () => {
  try {
    const response = await axios.post("http://localhost:5001/products", {
      productName: product.name,
      price: product.price,
      livestock: product.livestock,
    });

    if (response.status === 201) {
      await getAllProducts();

      Object.assign(product, initialProductState);
    }
  } catch (error) {
    console.error("ERROR", error.message);
  }
};

onMounted(async () => {
  try {
    const productsResponse = await axios.get("http://localhost:5001/products");
    products.value = productsResponse.data;

    const employeesResponse = await axios.get(
      "https://cordova-media.com/apps/restapi/api/list"
    );
    employees.value = employeesResponse.data;
  } catch (error) {
    console.error(error.message);
  }
});
</script>

<template>
  <section id="about" class="section">
    <div class="container">
      <div class="row">
        <div class="col-md-7 col-sm-12 wow fadeInLeft">
          <div class="sub-heading">
            <h3>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam
              ipsa recusandae consequatur veniam, reiciendis odit quia eaque vel
              eius a.
            </h3>
          </div>
          <div class="block">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ulla-mco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque,
              aspernatur.
            </p>
          </div>
        </div>
        <div class="col-md-5 col-sm-12 wow fadeInLeft" data-wow-delay="0.3s">
          <div class="about-slider">
            <div class="init-slider">
              <div class="about-item">
                <img
                  src="../assets/images/about/1.jpg"
                  alt=""
                  class="img-responsive"
                />
              </div>
              <div class="about-item">
                <img
                  src="../assets/images/about/2.jpg"
                  alt=""
                  class="img-responsive"
                />
              </div>
              <div class="about-item">
                <img
                  src="../assets/images/about/3.jpg"
                  alt=""
                  class="img-responsive"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- #about close -->
  <!-- 
About start
==================== -->

  <!-- 
Service start
==================== -->
  <section id="service" class="section">
    <div class="container">
      <div class="row">
        <div class="heading wow fadeInUp">
          <h2>Our service</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et <br />
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex
          </p>
        </div>
        <div
          v-for="product in products"
          :key="product.id"
          class="col-sm-6 col-md-3 wow fadeInLeft"
        >
          <div class="service">
            <div class="icon-box">
              <span class="icon">
                <i class="ion-android-desktop"></i>
              </span>
            </div>
            <div class="caption">
              <h3>{{ product.productName }}</h3>
              <p>Rp{{ product.price }}</p>
              <p>Tersedia {{ product.livestock }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- .container close -->
  </section>
  <!-- #service close -->

  <section id="call-to-action" class="section">
    <div class="container">
      <div class="row">
        <div class="col-md-12 wow text-center">
          <div class="block">
            <h2>Lorem ipsum dolor sit amet, consectetur adipisicing</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod
            </p>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="Enter Your Email Address"
              />
              <button class="btn btn-default btn-submit" type="submit">
                Get Notified
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- #call-to-action close -->

  <!-- 
Contact start
==================== -->
  <section id="contact" class="section">
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
          <div class="block">
            <div class="heading wow fadeInUp">
              <h2>Get In Touch</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et <br />
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex
              </p>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-5 wow fadeInUp">
          <div class="block text-left">
            <div class="sub-heading">
              <h4>Contact Address</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
                quos maxime voluptate doloribus, voluptatum nemo vel ipsa in
                eligendi, ullam. Ducimus consequuntur labore error hic.
              </p>
            </div>
            <address class="address">
              <hr />
              <p>
                Dhanmondi 32,<br />
                Dhaka,<br />
                Bangladesh
              </p>
              <hr />
              <p>
                <strong>E:</strong>&nbsp;hello@foundry.net<br />
                <strong>P:</strong>&nbsp;+614 3948 2726
              </p>
            </address>
          </div>
        </div>

        <div
          class="col-xs-12 col-sm-12 col-md-5 col-md-offset-1 wow fadeInUp"
          data-wow-delay="0.3s"
        >
          <div class="form-group">
            <!-- <form id="contact-form" @submit.prevent> -->
            <div class="input-field">
              <input
                type="text"
                v-model="product.name"
                class="form-control"
                placeholder="Product Name"
                name="product"
              />
            </div>
            <div class="input-field">
              <input
                type="text"
                v-model.number="product.price"
                class="form-control"
                placeholder="Price"
                name="price"
              />
            </div>
            <div class="input-field">
              <input
                type="text"
                v-model.number="product.livestock"
                class="form-control"
                placeholder="Livestock"
                name="livestock"
              />
            </div>
            <!-- <div class="input-field">
                <textarea
                  class="form-control"
                  placeholder="Your Message"
                  rows="3"
                  name="message"
                ></textarea>
              </div> -->
            <button class="btn btn-send" type="submit" @click="submitForm">
              Send me
            </button>
            <!-- </form> -->

            <!-- <div id="success">
              <p>Your Message was sent successfully</p>
            </div>
            <div id="error">
              <p>Your Message was not sent successfully</p>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </section>

  <section clas="wow fadeInUp">
    <div class="map-wrapper"></div>
  </section>
</template>

<style></style>
