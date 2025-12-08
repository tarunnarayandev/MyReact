import React, { useState } from "react";
import { TabComponent } from "../../components/TabComponent";
import { consultData } from "./data";
export const ConsultDetails = () => {
    const [activeTab, setActiveTab] = useState(0)
    const onTabClick = (idx) => {
        setActiveTab(idx)
    }
    return <div>
        <TabComponent tabsArr={consultData} onTabClick={(idx) => onTabClick(idx)}  activeTabIndex={activeTab}/>
    </div>
}