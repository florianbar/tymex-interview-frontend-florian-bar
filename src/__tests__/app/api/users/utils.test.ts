import { getUsers } from "@/app/api/users/utils";

describe("getUsers", () => {
  it("should return all users when no filters are applied", async () => {
    const users = await getUsers(null, null, null, null, null);
    expect(users).toHaveLength(20); // Default limit is 10
    expect(users[0]).toHaveProperty("id");
    expect(users[0]).toHaveProperty("name");
    expect(users[0]).toHaveProperty("email");
  });

  it("should filter users by id", async () => {
    const users = await getUsers("1", null, null, null, null);
    expect(users).toHaveLength(1);
    expect(users[0].id).toBe(1);
  });

  it("should filter users by name case-insensitively", async () => {
    const users = await getUsers(null, "ALICE", null, null, null);
    expect(users.length).toBeGreaterThan(0);
    expect(users[0].name.toLowerCase()).toContain("alice");
  });

  it("should filter users by email case-insensitively", async () => {
    const users = await getUsers(null, null, "ALICE@EXAMPLE.COM", null, null);
    expect(users.length).toBeGreaterThan(0);
    expect(users[0].email.toLowerCase()).toBe("alice@example.com");
  });

  it("should handle pagination", async () => {
    const page1 = await getUsers(null, null, null, "1", "2");
    const page2 = await getUsers(null, null, null, "2", "2");

    expect(page1).toHaveLength(2);
    expect(page2).toHaveLength(2);
    expect(page1[0].id).not.toBe(page2[0].id);
  });

  it("should return empty array when no matches found", async () => {
    const users = await getUsers(null, "NonexistentUser", null, null, null);
    expect(users).toHaveLength(0);
  });

  it("should handle multiple filters simultaneously", async () => {
    const users = await getUsers(
      null,
      "Alice",
      "alice@example.com",
      null,
      null
    );
    expect(users.length).toBeGreaterThan(0);
    expect(users[0].name).toBe("Alice");
    expect(users[0].email).toBe("alice@example.com");
  });

  it("should use default limit when limit is not provided", async () => {
    const users = await getUsers(null, null, null, "1", null);
    expect(users.length).toBeLessThanOrEqual(20); // Default limit is 10
  });

  it("should use default page 1 when page is not provided", async () => {
    const withoutPage = await getUsers(null, null, null, null, "5");
    const withPage1 = await getUsers(null, null, null, "1", "5");
    expect(withoutPage).toEqual(withPage1);
  });
});
