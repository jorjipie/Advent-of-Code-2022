// Advent of Code 2022 https://adventofcode.com/2022/day/7#part2
//find the size of the smallest directory that can be deleted in order to make space for a software update.

let arr = require('fs')
    .readFileSync('./input.txt')
    .toString('utf-8')
    .split('\n');

const DirArrToStr = a => `/${a.join('/')}`;

const newDirectory = (path, size, type) => ({
    path,
    size,
    type
});

let directories = [], currentPath = [], currentPathStr = '';
for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] === '$') { 
        if (arr[i].split(' ')[1] == 'cd') { 
            //modify current path array depending on where we going.
            switch (arr[i].split(' ')[2]) {
                case '..':
                    currentPath.pop();
                    break;
                case '/':
                    currentPath = [];
                    break;
                default:
                    currentPath.push(arr[i].split(' ')[2]);
                    break;
            }
            currentPathStr = DirArrToStr(currentPath);
            if (!directories.some(e => e.path === currentPathStr)) {
                directories.push(newDirectory(currentPathStr, 0, 'dir'));
            }
        }
        continue;
    }
    else if (arr[i].split(' ')[0] === 'dir') {
        //add empty dir to array.
        currentPath.push(arr[i].split(' ')[1]);
        currentPathStr = DirArrToStr(currentPath);
        if (!directories.some(e => e.path === e.currentPathStr)) {
            directories.push(newDirectory(currentPathStr, 0, 'dir'));
        }
        currentPath.pop();
        currentPathStr = DirArrToStr(currentPath);
    } 
    else {
        let size = parseInt(arr[i].split(' ')[0], 10);
        currentPath.push(arr[i].split(' ')[1]);
        currentPathStr = DirArrToStr(currentPath);
        if (!directories.some(e => e.path === currentPathStr)) {
            directories.push(newDirectory(currentPathStr, size, 'file'));
        }
        currentPath.pop();
        currentPathStr = DirArrToStr(currentPath);
    }
}

//sort directories by how deep they go
directories = directories
    .sort((a,b) => b.path.split('/').length - a.path.split('/').length);

//add child directory sizes to parents.
let path = '', parentPath = '', parentDirIndex = -1;
for (let i = 0; i < directories.length; i++) {
    path = directories[i].path;
    parentPath = path.substring(0, path.lastIndexOf('/')) || '/';
    parentDirIndex = directories.findIndex(e => e.path === parentPath);
    if (parentDirIndex !== -1) { directories[parentDirIndex].size += directories[i].size; } 
}

directories = directories.filter(e => e.type === 'dir').map(e => e.size);
AddlSpaceNeeded = 30000000 - (70000000 - Math.max(...directories));

console.log(Math.min(...directories.filter(e => e > AddlSpaceNeeded)));