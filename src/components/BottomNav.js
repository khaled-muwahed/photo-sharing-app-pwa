import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';

import {Home , People , Settings} from '@material-ui/icons';


//export default function BottomNav (value , onChange)
//  <BottomNavigation value = {value} onChange = {(e , tab)=> onChange(tab)}>
export default function BottomNav () {

    return(
        <BottomNavigation>
            <BottomNavigationAction icon = {<Home />} />
            <BottomNavigationAction icon = {<People />} />
            <BottomNavigationAction icon = {<Settings />} />
        </BottomNavigation>


    );
}