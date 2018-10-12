import { PipeTransform, Pipe } from '@angular/core';
import { User } from '../core/models/user';

@Pipe({
    name: 'userFilter'
})

export class UserFilterPipe implements PipeTransform {

    transform(value: User[], filterBy: string, firstName: boolean, lastName: boolean, email: boolean): User[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;

        // console.log("test",firstName)
        // console.log("test",lastName)
        // console.log("test",email)
        if (firstName || lastName || email) {
            return filterBy ? value.filter(
                (user: User) =>
                    (
                        (firstName && user.firstName.toLocaleLowerCase().indexOf(filterBy) !== -1) ||
                        (lastName && user.lastName.toLocaleLowerCase().indexOf(filterBy) !== -1) ||
                        (email && user.email.toLocaleLowerCase().indexOf(filterBy) !== -1)
                    )
            ) : value;
        }
        else {
            return filterBy ? value.filter((user: User) =>
                (
                    user.firstName.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
                    user.lastName.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
                    user.email.toLocaleLowerCase().indexOf(filterBy) !== -1)
            ) : value;
        }

    }
} 