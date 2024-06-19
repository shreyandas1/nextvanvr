"use client";

import {FcGoogle} from 'react-icons/fc'
import {FaGithub} from 'react-icons/fa'
import { Button } from '../ui/button';

export const Social = () => {
    return (
        <div>
            <Button variant='outline' onClick={() => {}}>
                <FcGoogle/>
            </Button>

            <Button variant='outline' onClick={() => {}}>
                <FaGithub />
            </Button>
            
        </div>
    )
}