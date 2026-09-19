"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useEffect, useState } from "react";
type responseType = {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};
const FormResponses = ({ password }: { password: string }) => {
  const [formResponses, setFormResponses] = useState<responseType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getResponses = async () => {
      try {
        const res = await axios.get("/api/formResponses", {
          headers: {
            "x-admin-password": password,
          },
        });
        if (res.status === 200) {
          setFormResponses(res.data.responses);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch form responses");
      }
    };

    getResponses();
  }, [password]);
  return (
    <div className="px-5 sm:px-20">
      {error && (
        <div className="my-5 rounded-md bg-red-50 p-4 text-center text-sm font-medium text-red-600">
          {error}
        </div>
      )}
      <Table className="my-10">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {formResponses.map((response) => {
            return (
              <TableRow key={response._id}>
                <TableCell>{response.name}</TableCell>
                <TableCell>{response.email}</TableCell>
                <TableCell>{response.message}</TableCell>
                <TableCell>{new Date(response.createdAt).toDateString()}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default FormResponses;
