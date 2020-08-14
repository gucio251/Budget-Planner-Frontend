import {ReactComponent as overviewIcon} from './../../assets/icons/overviewIcon.svg';
import {ReactComponent as reportsIcon} from './../../assets/icons/reportsIcon.svg';
import {ReactComponent as savingsIcon} from './../../assets/icons/savingsIcon.svg';

export const navigationList = [
    {
        Icon: overviewIcon,
        name: "Overview",
        link: "/dashboard"
    },
    {
        Icon: reportsIcon,
        name: "Reports",
        link: "/dashboard"
    },
    {
        Icon: savingsIcon,
        name: "Savings",
        link: "/dashboard"
    }
];
