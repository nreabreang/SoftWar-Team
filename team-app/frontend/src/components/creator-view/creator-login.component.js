import { Component } from "react";
import { Link } from "react-router-dom";
import "../Styles.css"

export default class creatorLogin extends Component {
	render() {
		return (
			<main>
				<div className="flex header-container">
					<p className="text-36px">Log in to your account</p>
				</div>

				<div className="flex justify-center">
					<div className="w-9/12">

						{/* input username*/}
						<div className="input-container w-1/2 mx-auto">
							<label className="">Username</label>
							<input
								className="input w-full"
								id="actName"
								name="actName"
								type="text"
							// value={this.state.actName}
							// onChange={this.onChangeActName}
							// placeholder="Enter Activity Name"
							/>
						</div>

						{/* input password */}
						<div className="input-container w-1/2 mx-auto">
							<label className="">Password</label>
							<input
								className="input w-full"
								id="actName"
								name="actName"
								type="text"
							// value={this.state.actName}
							// onChange={this.onChangeActName}
							// placeholder="Enter Activity Name"
							/>
						</div>

						<div className="container p-4">
							<input
								type="submit"
								value="Login"
								className="button-navy mx-auto"
							/>
						</div>

						<div className="line w-1/2 new" />

						<div className="container p-4">
							<input
								type="submit"
								value="G-mail"
								className="button-navy mx-auto"
							/>
						</div>

						<div className="container">
							<p className="text-14px justify-center">Don't have account yet?</p>
							<a href="#" className="button-lightpink-liner">Sign-up</a>
						</div>

					</div>

				</div>

			</main>

		);
	}
}
