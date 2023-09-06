// VALIDATE NEW ROOM PAGE

export async function validateNewRoom(values) {
  const errors = {};

  if (!values.userName) {
    errors.userName = "User Name Required 😐";
  } else if (values.userName.length < 4) {
    errors.userName = "User Name must be 4 characters or more 😐";
  } else if (values.userName.length > 20) {
    errors.userName = "User Name must be 20 characters or less 😐";
  }

  return errors;
}

// ****************************************************************************************************************

// VALIDATE EXISTING ROOM PAGE

export async function validateExistRoom(values) {
  const errors = {};

  if (!values.userName) {
    errors.userName = "User Name Required 😐";
  } else if (values.userName.length < 4) {
    errors.userName = "User Name must be 4 characters or more 😐";
  } else if (values.userName.length > 20) {
    errors.userName = "User Name must be 20 characters or less 😐";
  } else if (!values.roomCode) {
    errors.roomCode = "Room Code Required 😐";
  }
  return errors;
}
