import React from "react"
import logo from '../../assets/images/ logo_white.png';
import elipse1 from '../../assets/images/Elipse1.png';
import elipse2 from '../../assets/images/Elipse2.png';
import groupPreview from '../../assets/images/GroupPreview.png';
import dashboardPreview from '../../assets/images/DashboardPreview.png';
import profile from '../../assets/icons/profile.png';
import Button from '../../components/Button';
import './styles.css'

const Home = ({history}) => (
<div class="bodyDiv">
    <img class="elipseUp" src={elipse2} alt="Elipse"></img>
    <div class="homeContent">
        <div class="leftSide">
            <img src={logo} alt="Logo"></img>
            <img src={groupPreview} alt="Group"></img>
            <span>A place for gamers</span>
        </div>
        <div class="rightSide">
            <img src={dashboardPreview} alt="Dashboard Preview"></img>
            <div class="accountControls">
                <div>
                    <span><img src={profile} alt="Profile icon"/>BIENVENIDO</span>
                </div>
                <Button
                    text="Login"
                    onPress={()=>history.push('/login')}
                />
                <Button
                    text="Signup"
                    onPress={()=>history.push('/signup')}
                />
            </div>
        </div>
    </div>
    <img class="elipseDown" src={elipse1} alt="Elipse"></img>
</div>
);

export default Home;