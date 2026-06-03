/*
  Warnings:

  - You are about to drop the column `userAvatarUrl` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `authorAvatarUrl` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "userAvatarUrl";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "authorAvatarUrl";
