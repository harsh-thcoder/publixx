// const { db, admin } = require("../config/firebase");

// class AuthService {
//   async signup({ codename, linkedUser }) {
//     try {
//       const userRef = await db.collection("users").add({
//         codename,
//         linkedUser: linkedUser || null,
//         stageProgress: 1,
//         createdAt: admin.firestore.FieldValue.serverTimestamp(),
//       });
//       return { id: userRef.id };
//     } catch (error) {
//       // Handle/log error as needed
//       throw new Error("Failed to create user");
//     }
//   }

//   async getUserById(id) {
//     try {
//       const doc = await db.collection("users").doc(id).get();
//       if (!doc.exists) return null;
//       return { id: doc.id, ...doc.data() };
//     } catch (error) {
//       throw new Error("Failed to fetch user");
//     }
//   }

//   async updateUser(id, data) {
//     try {
//       await db.collection("users").doc(id).update(data);
//       return { id, ...data };
//     } catch (error) {
//       throw new Error("Failed to update user");
//     }
//   }
// }

// module.exports = new AuthService();

const bcrypt = require("bcryptjs");
const { db, admin } = require("../config/cloudinary");

class AuthService {
  async signup({ codename, password, linkedUsers }) {
    try {
      if (!Array.isArray(linkedUsers) || linkedUsers.length !== 2) {
        throw new Error("Exactly two linked users are required");
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const userRef = await db.collection("users").add({
        codename,
        password: hashedPassword,
        linkedUsers, // array of two users
        stageProgress: 1,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      return { id: userRef.id };
    } catch (error) {
      throw new Error("Failed to create user");
    }
  }

  async getUserById(id) {
    try {
      const doc = await db.collection("users").doc(id).get();
      if (!doc.exists) return null;
      const data = doc.data();
      delete data.password; // Never return password hash
      return { id: doc.id, ...data };
    } catch (error) {
      throw new Error("Failed to fetch user");
    }
  }

  async getUserByCodename(codename) {
    try {
      const snapshot = await db.collection("users").where("codename", "==", codename).limit(1).get();
      if (snapshot.empty) return null;
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      throw new Error("Failed to fetch user");
    }
  }

  async updateUser(id, data) {
    try {
      await db.collection("users").doc(id).update(data);
      return { id, ...data };
    } catch (error) {
      throw new Error("Failed to update user");
    }
  }

  async login({ codename, password }) {
    try {
      const user = await this.getUserByCodename(codename);
      if (!user) throw new Error("User not found");
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("Invalid password");
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      throw new Error(error.message || "Login failed");
    }
  }
}

module.exports = new AuthService();