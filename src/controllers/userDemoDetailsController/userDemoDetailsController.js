const BotUserDemo = require("../../models/adddemodetails/userDemoDetailsModels");

    const addUserDemoInfo = async(req, res) => {
        const { name, phone, email, planLeave, sickLeave } = req.body;

        const newUser = new BotUserDemo({
          name,
          phone,
          email,
          planLeave,
          sickLeave,
          planLeaveBalance: planLeave,
          sickLeaveBalance: sickLeave
        });
        const user = await  newUser.save();
        if(!user){
            console.error('Error creating user:', error);
            return res.status(500).send('Internal Server Error');
        }
        return res.status(201).send({user})
      }
   
      // Update leave balances
const updateDemoUserInfo= async (req, res) => {
  const { userId } = req.params;
  const { planLeave, sickLeave } = req.body;

  try {
    const user = await BotUserDemo.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const previousPlanLeave = user.planLeave;
    const previousSickLeave = user.sickLeave;

    user.planLeave = previousPlanLeave + planLeave;
    user.sickLeave = previousSickLeave + sickLeave;
    user.planLeaveBalance += planLeave;
    user.sickLeaveBalance += sickLeave;
    user.totalLeaveBalance = user.planLeaveBalance + user.sickLeaveBalance;

    const updatedUser = await user.save();
    if (!updatedUser) {
      console.error('Error updating leave balances');
      return res.status(500).send('Internal Server Error');
    }

    return res.send(updatedUser);
  } catch (error) {
    console.error('Error finding or updating user:', error);
    return res.status(500).send('Internal Server Error');
  }
};


const getAllDemoUserDetails= (req, res) => {
  const { phone } = req.params;

  BotUserDemo.findOne({ phone })
    .then((user) => {
      if (!user) {
        return res.status(404).send('User not found');
      }

      res.json(user);
    })
    .catch((error) => {
      console.error('Error retrieving user:', error);
      res.status(500).send('Internal Server Error');
    });
}; 
    
    module.exports = {addUserDemoInfo,updateDemoUserInfo,getAllDemoUserDetails}