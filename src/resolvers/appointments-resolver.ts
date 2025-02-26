import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
} from "type-graphql";
import { CreateAppointmentInput } from "../dtos/inputs/create-appointment-input";
import { Appointment } from "../dtos/models/appointment-model";
import { Customer } from "../dtos/models/cutomer-model";
import { CreateCustomerInput } from "../dtos/inputs/create-customer-input";
import { PrismaClient } from "@prisma/client";

@Resolver(() => Appointment)
export class AppointmentsResolver {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  @Query(() => [Appointment])
  async appointments() {
    return [
      {
        startsAt: new Date(),
        endsAt: new Date(),
      },
    ];
  }

  @Mutation(() => Customer)
  async createCustomer(@Arg("data") data: CreateCustomerInput) {
    const customer = {
      name: data.name,
    };

    await this.prisma.customer.create({ data: customer });

    return customer;
  }

  @Mutation(() => Appointment)
  async createAppointment(@Arg("data") data: CreateAppointmentInput) {
    const appointment = {
      startsAt: data.startsAt,
      endsAt: data.endsAt,
      customerId: data.customerId,
    };

    await this.prisma.appointment.create({ data: appointment });

    return appointment;
  }

  @FieldResolver(() => Customer)
  async customer(@Root() appointment: Appointment) {
    console.log(appointment);

    return {
      name: "John Doe",
    };
  }
}
