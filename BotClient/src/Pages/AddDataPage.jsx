import React, { useState } from "react";
import "../Dashboard.css";

import "bootstrap/dist/css/bootstrap.min.css"
import AddData from "../Components/AddData";
import SideNav from "../Dashboard/SideNav";
import Navbar from "../Dashboard/Navbar";


function AddDataPages({ user, setLoginUser }) {
	const [style, setStyle] = useState(
		"navbar-nav bg-gray-600  sidebar sidebar-dark accordion"
	);

	const changeStyle = () => {
		if (
			style === "navbar-nav bg-gray-600  sidebar sidebar-dark accordion"
		) {
			setStyle(
				"navbar-nav bg-gray-600  sidebar sidebar-dark accordion toggled"
			);
		} else {
			setStyle("navbar-nav bg-gray-600  sidebar sidebar-dark accordion");
		}
	};
	const changeStyle1 = () => {
		if (
			style === "navbar-nav bg-gray-900  sidebar sidebar-dark accordion"
		) {
			setStyle(
				"navbar-nav bg-gray-900  sidebar sidebar-dark accordion toggled1"
			);
		} else {
			setStyle("navbar-nav bg-gray-900  sidebar sidebar-dark accordion");
		}
	};

	return (
		<div>
			<body id="page-top">
				{/* <!-- Page Wrapper -->  */}
				<div id="wrapper">
					{/*  <!-- Sidebar --> */}
					<SideNav setStyle={setStyle} style={style} changeStyle={changeStyle} />
					{/*  <!-- End of Sidebar --> */}

					{/*  <!-- Content Wrapper --> */}
					<div id="content-wrapper" className="d-flex flex-column">
						{/*  <!-- Main Content --> */}
						<div id="content">
							{/*  <!-- Topbar --> */}
							<Navbar setStyle={setStyle} style={style} changeStyle1={changeStyle1}  setLoginUser={setLoginUser} user={user} />
							{/*  <!-- End of Topbar --> */}

							{/* <!-- Begin Page Content --> */}
							<div className="container-fluid " style={{
								paddingLeft: "0",
								paddingRight: "0",
							}}>
								<AddData setLoginUser={setLoginUser} user={user} />
							</div>
							{/*   <!-- /.container-fluid --> */}
						</div>
						{/*   <!-- End of Main Content -->

                                        <!-- Footer --> */}
						{/* <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>Copyright &copy; Inuds Net Techonology</span>
                </div>
              </div>
            </footer> */}
						{/* <!-- End of Footer --> */}
					</div>
					{/*  <!-- End of Content Wrapper --> */}
				</div>
				{/*  <!-- End of Page Wrapper -->

                                <!-- Scroll to Top Button--> */}
				{/* <Link className="scroll-to-top rounded" href="/page-top">
          <i className="fas fa-angle-up"></i>
        </Link> */}
			</body>
		</div>
	);
}

export default AddDataPages;
