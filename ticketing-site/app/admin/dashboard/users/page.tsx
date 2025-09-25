"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

// 가짜(mock) 사용자 데이터
const mockUsers = [
  { id: 'user001', name: '홍길동', email: 'hong@example.com', signUpDate: '2025-09-01', status: '활성' },
  { id: 'user002', name: '이순신', email: 'lee@example.com', signUpDate: '2025-09-05', status: '활성' },
  { id: 'user003', name: '유관순', email: 'ryu@example.com', signUpDate: '2025-09-10', status: '정지' },
  { id: 'user004', name: '세종대왕', email: 'sejong@example.com', signUpDate: '2025-09-12', status: '활성' },
];

export default function UserManagementPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">계정 관리</h1>
        <div className="w-1/3">
          <Input placeholder="사용자 이름 또는 이메일로 검색..." />
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>이름</TableHead>
              <TableHead>이메일</TableHead>
              <TableHead>가입일</TableHead>
              <TableHead>상태</TableHead>
              <TableHead className="text-right">관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.signUpDate}</TableCell>
                <TableCell>
                  <Badge variant={user.status === '활성' ? 'default' : 'destructive'}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">상세 보기</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
