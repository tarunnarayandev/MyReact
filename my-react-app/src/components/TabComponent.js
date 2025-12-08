export const TabComponent = ({tabsArr,activeTabIndex, onTabClick}) => {

    return <div>
        <div className='flex'>
        {tabsArr?.map((item,index) => {
            return <div>
                <button style={{color: index===activeTabIndex? "blue": "black"}} onClick={() => onTabClick(index)}>{item?.name}</button>
            </div>
        })}
        </div>

        {tabsArr && <div>{tabsArr[activeTabIndex]?.tabData.value}</div>}
    </div>
}