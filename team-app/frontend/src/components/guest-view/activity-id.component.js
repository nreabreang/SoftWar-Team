import axios from "axios";
const { Component } = require("react");

const ActivityList = (props) => (
  <div class="m-4 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {props.activity.actName}
    </h5>

    <p class="mb-3 font-medium text-gray-700 dark:text-gray-400">
      <h5 className="font-bold">Description</h5>
      {props.activity.actDescription}
    </p>
    <h5 className="font-bold">Date</h5>
    <p class="mb-3 font-medium text-gray-700 dark:text-gray-400">
      {props.activity.date.substring(0, 10)}
    </p>
  </div>
);

export default class activityId extends Component {
  constructor(props) {
    super(props);
    this.deleteActivity = this.deleteActivity.bind(this);

    this.state = {
      activity: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/activity/")
      .then((response) => {
        this.setState({ activity: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteActivity(id) {
    axios
      .delete("http://localhost:5000/activity/" + id)
      .then((res) => console.log(res.data));
    window.location = "/activityList";
    this.setState({
      activity: this.state.activity.filter((el) => el.id !== id),
    });
  }

  ActivityList() {
    return <div>
        Test
    </div>;
  }

  render() {
    return <div>{this.ActivityList()}</div>;
  }
}
