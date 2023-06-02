-- CreateTable
CREATE TABLE "Plan" (
    "id" INTEGER NOT NULL,
    "data" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
