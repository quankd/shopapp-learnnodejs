import mongoose from "mongoose";
import { UserDoc, UserModel , AuthenticationService } from "@shopapp-learnnodejs/common";

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = doc._id;
        delete doc._id;
        delete doc.password;
      },
    },
  },
);

schema.pre('save', async function(done){
    const authenticationService = new AuthenticationService();
    if (this.isModified('password') || this.isNew){ // this = schema
        const hashedPwd = await authenticationService.pwdToHash(this.get('password'))
        this.set('password', hashedPwd) // password => hashedPassword
    }
    done();
})

export const User = mongoose.model<UserDoc, UserModel>("User", schema);
