import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Search, Filter, MoreVertical, UserPlus, Mail, Lock, Trash2, Edit } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Candidate' | 'HR Manager' | 'Administrator';
  status: 'Active' | 'Inactive' | 'Pending';
  lastLogin: string;
  createdDate: string;
}

export function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());

  const users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@email.com',
      role: 'Candidate',
      status: 'Active',
      lastLogin: '2024-10-30',
      createdDate: '2024-01-15',
    },
    {
      id: '2',
      name: 'Sarah Smith',
      email: 'sarah.smith@company.com',
      role: 'HR Manager',
      status: 'Active',
      lastLogin: '2024-10-31',
      createdDate: '2024-02-20',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.j@email.com',
      role: 'Candidate',
      status: 'Active',
      lastLogin: '2024-10-29',
      createdDate: '2024-03-10',
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.davis@company.com',
      role: 'Administrator',
      status: 'Active',
      lastLogin: '2024-10-31',
      createdDate: '2024-01-05',
    },
    {
      id: '5',
      name: 'Robert Wilson',
      email: 'robert.w@email.com',
      role: 'Candidate',
      status: 'Pending',
      lastLogin: 'Never',
      createdDate: '2024-10-28',
    },
    {
      id: '6',
      name: 'Lisa Anderson',
      email: 'lisa.a@company.com',
      role: 'HR Manager',
      status: 'Active',
      lastLogin: '2024-10-30',
      createdDate: '2024-04-12',
    },
    {
      id: '7',
      name: 'David Brown',
      email: 'david.b@email.com',
      role: 'Candidate',
      status: 'Inactive',
      lastLogin: '2024-09-15',
      createdDate: '2024-05-20',
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch = searchQuery === '' || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const toggleSelectUser = (userId: string) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedUsers.size === filteredUsers.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(filteredUsers.map(u => u.id)));
    }
  };

  const getRoleBadge = (role: User['role']) => {
    const styles = {
      'Candidate': 'bg-blue-100 text-blue-700 border-blue-200',
      'HR Manager': 'bg-purple-100 text-purple-700 border-purple-200',
      'Administrator': 'bg-red-100 text-red-700 border-red-200',
    };

    return (
      <Badge variant="outline" className={styles[role]}>
        {role}
      </Badge>
    );
  };

  const getStatusBadge = (status: User['status']) => {
    const styles = {
      'Active': 'bg-green-100 text-green-700 border-green-200',
      'Inactive': 'bg-gray-100 text-gray-700 border-gray-200',
      'Pending': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    };

    return (
      <Badge variant="outline" className={styles[status]}>
        {status}
      </Badge>
    );
  };

  const handleBulkAction = (action: string) => {
    toast.success(`${action} applied to ${selectedUsers.size} user(s)`);
    setSelectedUsers(new Set());
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">User Management</h2>
          <p className="text-gray-600 mt-1">Manage all platform users and their permissions</p>
        </div>
        <Button className="bg-[#2563eb] hover:bg-[#1d4ed8]">
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Role Filter */}
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="Candidate">Candidate</SelectItem>
              <SelectItem value="HR Manager">HR Manager</SelectItem>
              <SelectItem value="Administrator">Administrator</SelectItem>
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Bulk Actions */}
      {selectedUsers.size > 0 && (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              {selectedUsers.size} user(s) selected
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('Activate')}
              >
                Activate
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('Deactivate')}
              >
                Deactivate
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('Delete')}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Users Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedUsers.size === filteredUsers.length && filteredUsers.length > 0}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedUsers.has(user.id)}
                    onCheckedChange={() => toggleSelectUser(user.id)}
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <p className="text-sm text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </TableCell>
                <TableCell>{getRoleBadge(user.role)}</TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell>
                  <span className="text-sm text-gray-600">
                    {user.lastLogin === 'Never' 
                      ? user.lastLogin 
                      : new Date(user.lastLogin).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-600">
                    {new Date(user.createdDate).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Email
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Lock className="mr-2 h-4 w-4" />
                        Reset Password
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No users found matching your criteria.</p>
            <Button
              variant="link"
              onClick={() => {
                setSearchQuery('');
                setRoleFilter('all');
                setStatusFilter('all');
              }}
              className="text-[#2563eb]"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </Card>

      {/* Pagination */}
      {filteredUsers.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredUsers.length} of {users.length} users
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
