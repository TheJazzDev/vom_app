import { departmentsRef, firestore, membersRef } from '@/src/config';
import { doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { serializeFirestoreData } from '@/src/utils';

export const getAllDepartments = async (): Promise<Department[]> => {
  try {
    const departmentsSnapshot = await getDocs(departmentsRef);

    return departmentsSnapshot.docs.map((doc) =>
      serializeFirestoreData<Department>({
        id: doc.id,
        ...doc.data(),
      })
    );
  } catch (error) {
    console.error('Error fetching departments:', error);
    throw new Error('Failed to fetch departments');
  }
};

export const getDepartmentById = async (
  departmentId: string,
): Promise<Department | null> => {
  try {
    const bandDoc = await getDoc(doc(firestore, 'departments', departmentId));

    if (!bandDoc.exists()) {
      return null;
    }

    return serializeFirestoreData<Department>({
      id: bandDoc.id,
      ...bandDoc.data(),
    });
  } catch (error) {
    console.error('Error fetching band:', error);
    throw new Error('Failed to fetch band');
  }
};

export const getDepartmentWithMembers = async (
  departmentId: DepartmentKeys,
): Promise<DepartmentWithMembers | null> => {
  try {
    const department = await getDepartmentById(departmentId);

    if (!department) return null;

    const membersQuery = query(
      membersRef,
      where('departmentKeys', 'array-contains', department.id),
    );
    const membersSnapshot = await getDocs(membersQuery);

    const members = membersSnapshot.docs.map((doc) =>
      serializeFirestoreData<UserProfile>({
        id: doc.id,
        ...doc.data(),
      })
    );

    return {
      ...department,
      members,
    };
  } catch (error) {
    console.error('Error fetching department with members:', error);
    throw new Error('Failed to fetch department with members');
  }
};
