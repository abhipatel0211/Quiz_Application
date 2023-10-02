import Questions from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";
import English from "../models/questionengSchema.js";
import Hindi from "../models/questionhindiSchema.js";
import cpp from "../models/questioncppSchema.js";
import User from "../models/userSchema.js";

export async function loginUser(req, res) {
  // console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    res.json({ error: "Please fill all the fields" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.json({ error: "User does not exists" });
  } else if (user.password !== password) {
    res.json({ error: "Incorrect password" });
  } else {
    // console.log("hello");
    const token = await user.generateAuthToken();
    // console.log(token);
    res.cookie("token", token, {
      expires: new Date(Date.now() + 360),
      httpOnly: true,
    });
    res.json(user);
  }
}
export async function registerUser(req, res) {
  // console.log(req.body);
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    res.json({ error: "Please fill all the fields" });
  }
  const user = await User.findOne({ email });
  if (user) {
    res.json({ error: "User already exists" });
  } else {
    const user = new User({ email, name, password });
    await user.save();
    res.json("User registed successfully");
  }
}

/** get all questions */
export async function getQuestions(req, res) {
  try {
    const q = await Questions.find();
    res.json(q);
  } catch (error) {
    res.json({ error });
  }
}
/** get all question of english */
export async function getenglish(req, res) {
  // console.log("hello english");
  try {
    const q = await English.find();
    res.json(q);
  } catch (error) {
    res.json({ error });
  }
}
export async function gethindi(req, res) {
  // console.log("hello hindi");
  try {
    const q = await Hindi.find();
    res.json(q);
  } catch (error) {
    res.json({ error });
  }
}
export async function getcpp(req, res) {
  // console.log("hello cpp");
  try {
    const q = await cpp.find();
    res.json(q);
  } catch (error) {
    res.json({ error });
  }
}

/** insert all questinos */
export async function insertQuestions(req, res) {
  try {
    Questions.insertMany({ questions, answers }, function (err, data) {
      res.json({ msg: "Data Saved Successfully...!" });
    });
  } catch (error) {
    res.json({ error });
  }
}

/** Delete all Questions */
export async function dropQuestions(req, res) {
  try {
    await Questions.deleteMany();
    res.json({ msg: "Questions Deleted Successfully...!" });
  } catch (error) {
    res.json({ error });
  }
}

/** get all result */
export async function getResult(req, res) {
  try {
    const r = await Results.find();
    res.json(r);
  } catch (error) {
    res.json({ error });
  }
}

/** post all result */
export async function storeResult(req, res) {
  try {
    const { username, result, attempts, points, achived } = req.body;
    if (!username && !result) throw new Error("Data Not Provided...!");

    Results.create(
      { username, result, attempts, points, achived },
      function (err, data) {
        res.json({ msg: "Result Saved Successfully...!" });
      }
    );
  } catch (error) {
    res.json({ error });
  }
}

/** delete all result */
export async function dropResult(req, res) {
  try {
    await Results.deleteMany();
    res.json({ msg: "Result Deleted Successfully...!" });
  } catch (error) {
    res.json({ error });
  }
}
