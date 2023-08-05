/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/lib/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/lib/components/ui/button";
import { Input } from "@/lib/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/lib/components/ui/form";
import { Outfit } from "next/font/google";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import Link from "next/link";

const outfit = Outfit({ subsets: ["latin"] });

const ResetPassword = (): JSX.Element => {
  const formSchema = z.object({
    password: z.string().nonempty({
      message: "Your password is required."
    }).min(8, {
      message: "Your password is too short."
    }),
    confirmPassword: z.string().nonempty({
      message: "Your password confirmation is required."
    }).min(8, {
      message: "Your password confirmation is too short."
    })
  });

  const form = useForm({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = (): void => {
    console.log("Submitted!");
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 md:mt-16 px-3">
      <Card className="w-full max-w-[30rem]">
        <CardHeader className="-mb-3">
          <CardTitle className={outfit.className}>Type your new password</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className={cn("w-full flex gap-1", outfit.className)}>
                Reset password
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col justify-start items-start">
          <div>
            Changed your mind?&nbsp;<Link href={"/sign-in"} className="text-primary hover:underline">Click here to sign in.</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResetPassword;