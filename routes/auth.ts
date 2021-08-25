import express, { Request, Response } from 'express';
import UserService from '../services/user-service';
import IToken from '../viewModels/tokenViewModel';
import Container from 'typedi';

const router = express.Router()


router.post('/register', async (req: Request, res: Response) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint to create new user'
    /* #swagger.parameters['userId'] = { 
            description: 'User Id (must be an identification number)',
            type: 'number'    
    }*/
    /* #swagger.parameters['password'] = {
           description: 'Password to login later',
           type: 'string'
    } */
    const { userId, password } = req.body
    if (!(userId && password)) {
        res.status(400).send("All input is required");
    }

    let userService: UserService = Container.get<UserService>(UserService);
    const response: boolean = await userService.createUserAsync(+userId, password)
    if (response) {
        return res.status(200).send()
    }
    else {
        res.status(400).send('Duplicate Id')
    }

})

router.post('/login', async (req: Request, res: Response) => {
    const { userId, password } = req.body
    if (!(userId && password)) {
        res.status(400).send("All input is required");
    }
    let userService: UserService = Container.get<UserService>(UserService);
    const response: IToken = await userService.userLoginAsync(userId, password)
    return response ? res.send(response) : res.status(400).send("Incorrect Password");

})

module.exports = router