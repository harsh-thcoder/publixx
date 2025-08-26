const { db, admin } = require("../config/firebase");

class AuthService {
  async signup({ codename, linkedUser }) {
    try {
      const userRef = await db.collection("users").add({
        codename,
        linkedUser: linkedUser || null,
        stageProgress: 1,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      return { id: userRef.id };
    } catch (error) {
      // Handle/log error as needed
      throw new Error("Failed to create user");
    }
  }

  async getUserById(id) {
    try {
      const doc = await db.collection("users").doc(id).get();
      if (!doc.exists) return null;
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
}

module.exports = new AuthService();