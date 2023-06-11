function IsPlayerCreationOptions (arg: unknown): boolean
{
    return !!arg && typeof arg === "object" && 
    "nickname" in arg && "email" in arg && "password" in arg;
}


export default  {
    IsPlayerCreationOptions,
} as const;