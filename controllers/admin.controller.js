const { formatDateTime, dataProcess, formatDate, encodeStatusCode, formatDateTime2 } = require("../config/helper");
const { getUserAccountByStatus, getUserDetailByUsername, updateUserStatus } = require("../models/admin.model");

const getAdminHome = (req, res) => {
    res.render('admin/home', { title: "Admin", isAdmin: true });
}

const handleAdminUserAccount = async (req, res) => {
    const username = req.query['username']
    if (username === undefined) {
        const raw = await getUserAccountByStatus(0)
        const data = raw.map(e => ({
            id: e.id,
            username: e.username,
            status: e.status,
            last_modified: formatDateTime(e.last_modified)
        }))

        return res.render('admin/account', { title: "Account", isAdmin: true, data })
    } else {
        const raw = await getUserDetailByUsername(username)
        const data = raw.map(e => ({
            id: e.id,
            username: e.username,
            status: encodeStatusCode(e.status),
            statusCode: e.status,
            phone: e.phone,
            email: e.email,
            name: e.name,
            date_of_birth: formatDate(e.date_of_birth),
            address: e.address,
            front_cmnd: e.front_cmnd,
            back_cmnd: e.back_cmnd,
            total_value: e.total_value
        }))
        console.log(data)
        return res.render('admin/account-info', { title: "Account", isAdmin: true, data })
    }
}

const handleAccountApi = async (req, res) => {
    const statusArr = [0, 1, 2, 3, 4]
    let status = req.query["status"]
    if (status === undefined) {
        status = 0
    }
    if (!statusArr.includes(+status)) {
        return res.json({
            code: 1,
            message: "Status not valid!",
        })
    } else {
        const raw = await getUserAccountByStatus(status)
        const data = raw.map(e => ({
            id: e.id,
            username: e.username,
            status: e.status,
            last_modified: formatDateTime(e.last_modified)
        }))
        res.json({
            code: 0,
            message: "Get data successful!",
            data
        })
    }
}

const handleAccountStatus = async (req,res)=>{
    const {username, action} = req.body
    
    if(username===undefined||action===undefined){
        return res.json({
            code:1,
            message:"Missing input value!"
        })
    }else{
        try {
            const actions = ['verify','cancel','request']
            const actionIndex = actions.indexOf(action)+1
            const currentDateTime = formatDateTime2();
            if(await updateUserStatus(username,actionIndex,currentDateTime)){
                return res.json({
                    code: 0,
                    message: `Update username=${username} successful!`,
                })
            }else{
                res.json({
                    code:1,
                    message:"Something went wrong!"
                })
            }
        } catch (error) {
            console.log(error.message)
        }
    }


}



module.exports = {
    getAdminHome,
    handleAdminUserAccount,
    handleAccountApi,
    handleAccountStatus
}