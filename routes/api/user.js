const Router=require('express').Router()
const userController=require('./../../controllers/userController')
const verifyRoles=require('./../../middleware/verifyRoles') 
const ROLES_LIST=require('./../../config/roles_List')   

Router.route('/').get(verifyRoles(ROLES_LIST.Admin),userController.showUser)
                 .put(verifyRoles(ROLES_LIST.Admin),userController.updateUser)
                 .delete(verifyRoles(ROLES_LIST.Admin),userController.delUser)
Router.route('/:id').get(verifyRoles(ROLES_LIST.Admin),userController.getUser)

module.exports=Router;