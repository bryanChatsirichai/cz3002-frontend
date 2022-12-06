import axios from "axios";
import React from "react";

/** Base path to database */
const axiosInstance = axios.create({ baseURL: "http://localhost:8080" });

/**
 * Token for database if needed
 */

class AxiosInterface extends React.Component {
  constructor(props) {
    super(props);
    //console.log("Axios Interface Init")
    // Uncomment this to have a logger
    //this.Logger();
  }

  // GET REQUEST
  async getData(route, custom_headers) {
    console.log("GET Request", route);
    const config = {
      headers: custom_headers,
    };
    return await axiosInstance.get(route, config);
  }

  // POST REQUEST
  // What post is depends on the format of the json
  // post = {
  //          title: "TODO",
  //          completed: false
  //        }
  async postData(route, post, custom_headers) {
    console.log("POST Request", route);
    const config = {
      headers: custom_headers,
    };
    return await axiosInstance.post(route, post, config);
  }

  // DELETE REQUEST
  // Deletes data in route with id
  async removeData(route, id, custom_headers) {
    console.log("DELETE Request", route);
    const config = {
      headers: custom_headers,
    };
    return await axiosInstance.delete(route + "/" + id, config);
  }

  // Everything in update will change but the rest retains
  async patchData(route, id, update, custom_headers) {
    console.log("PATCH Request", route);
    const config = {
      headers: custom_headers,
    };
    return await axiosInstance.patch(route + "/" + id, update, config);
  }

  //==========================================================
  // PUT REQUEST changes the entire data of the data
  // What the update param is depends on the format of the data
  // update = {
  //          title: "TODO",
  //          completed: false
  //        }
  // Replaces the previous data with post param
  putData(route, id, update, custom_headers) {
    console.log("PUT Request");
    const config = {
      headers: custom_headers,
    };
    axiosInstance
      .put(route + "/" + id, update, config)
      .then((res) => console.log(res))
      .catch((err) => {
        if (err.response) {
          // Server responded with a status other than 200 range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);

          if (err.response.status === 404) {
            alert("Error: Page Not Found");
          }
        } else if (err.request) {
          // Request was made but no response
          console.error(err.request);
        } else {
          console.error(err.message);
        }
      });
  }

  // PATCH REQUEST retains previous information of the data while updating the rest
  // Basically the same thing as PUT but does not override the entire data
  // update = {
  //          title: "TODO",
  //          completed: false
  //        }

  // SIMULTANEOUS DATA (NOT SURE IF WORKING ATM)
  getSimData() {
    console.log("Simultaneous Request");
    axios
      .all([
        axios.get("https://jsonplaceholder.typicode.com/todos"),
        axios.get("https://jsonplaceholder.typicode.com/posts"),
      ])
      .then((res) => {
        console.log(res[0]);
        console.log(res[1]);
      })
      .catch((err) => {
        if (err.response) {
          // Server responded with a status other than 200 range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);

          if (err.response.status === 404) {
            alert("Error: Page Not Found");
          }
        } else if (err.request) {
          // Request was made but no response
          console.error(err.request);
        } else {
          console.error(err.message);
        }
      });
  }

  // TRANSFORMING REQUESTS & RESPONSES
  // Do not think will be needing this but just in case
  // transformResponse() {
  //     console.log('Transform Response');

  //     const options = {
  //         method: 'post',
  //         url: "https://jsonplaceholder.typicode.com/todos",
  //         data: {
  //             title: "Hello World"
  //         },
  //         transformResponse: axiosInstance.defaults.transformResponse.concat(data => {
  //             data.title = data.title.toUpperCase();
  //             return data;
  //         })
  //     };

  //     axios(options).then(res => { console.log(res) })
  // }

  // CANCEL TOKEN
  cancelToken() {
    console.log("Cancel Token");
    const source = axios.CancelToken.source();

    axiosInstance
      .get("https://jsonplaceholder.typicode.com/todos", {
        cancelToken: source.token,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((thrown) => {
        if (axiosInstance.isCancel(thrown)) {
          console.log("Request canceled", thrown.message);
        }
      });
  }

  // INTERCEPTORS
  // Makes use of the interceptors to create a logger to keep posting details of transactions
  Logger() {
    axiosInstance.interceptors.request.use(
      (config) => {
        console.log(
          `${config.method.toUpperCase()} request send to ${
            config.url
          } at ${new Date().getTime()}`
        );

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}
export default AxiosInterface;
