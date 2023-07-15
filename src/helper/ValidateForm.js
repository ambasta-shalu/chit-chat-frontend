// Validate New Room Page

export async function validateNewRoom(values) {
  const errors = {};

  if (!values.userName) {
    errors.userName = "User Name Required 😐";
  } else if (values.userName.length < 4) {
    errors.userName = "User Name must be 4 characters or more 😐";
  }

  return errors;
}

// ****************************************************************************************************************

// Validate Exist Room Page

export async function validateExistRoom(values) {
  const errors = {};

  if (!values.userName) {
    errors.userName = "User Name Required 😐";
  } else if (values.userName.length < 4) {
    errors.userName = "User Name must be 4 characters or more 😐";
  } else if (!values.roomCode) {
    errors.roomCode = "Room Code Required 😐";
  }
  return errors;
}
