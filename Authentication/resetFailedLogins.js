import { User } from "../Schema/User.js";
import { Admin } from "../Schema/Admin.js";

export const resetFailedLoginAttemptsForAllUsers = async () => {
  await User.updateMany({}, { failedLoginAttemptsToday: 0 });
  await Admin.updateMany({}, { failedLoginAttemptsToday: 0 });
};
